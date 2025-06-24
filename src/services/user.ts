'use client';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Add a purchased template to a user's document with retry logic
export async function addPurchasedTemplate(userId: string, templateId: string): Promise<void> {
  if (!db) {
    console.error("Firestore is not initialized. Check your Firebase configuration.");
    throw new Error("Firestore is unavailable. This could be due to network issues or because Firestore has not been set up/enabled in your Firebase project. Please check your Firebase console and network connection.");
  }
  
  const userDocRef = doc(db, 'users', userId);
  let attempts = 0;

  while (attempts < MAX_RETRY_ATTEMPTS) {
  try {
      attempts++;
      console.log(`Attempt ${attempts} to add purchased template ${templateId} for user ${userId}`);
      
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // If user document exists, update the purchasedTemplates array
      await updateDoc(userDocRef, {
        purchasedTemplates: arrayUnion(templateId)
      });
    } else {
      // If user document doesn't exist, create it with the purchased template
      await setDoc(userDocRef, {
        purchasedTemplates: [templateId]
      });
    }
      
      console.log(`Successfully added template ${templateId} to user ${userId}`);
      return;
  } catch (error: any) {
      if (error.code === 'unavailable' || error.code === 'resource-exhausted' || error.name === 'FirebaseError') {
        console.error(`Firestore error on attempt ${attempts}:`, error);
        
        // If we haven't reached max retries, wait and retry
        if (attempts < MAX_RETRY_ATTEMPTS) {
          console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
          await delay(RETRY_DELAY_MS * attempts); // Exponential backoff
          continue;
        }
      }
      
      console.error("Failed to add purchased template after multiple attempts:", error);
      throw new Error("Firestore is unavailable. This could be due to network issues or because Firestore has not been set up/enabled in your Firebase project. Please check your Firebase console and network connection.");
    }
  }
}

// Get all purchased templates for a user with retry logic
export async function getPurchasedTemplates(userId: string): Promise<string[]> {
  if (!db) {
    console.error("Firestore is not initialized. Check your Firebase configuration.");
    return [];
  }
  
  const userDocRef = doc(db, 'users', userId);
  let attempts = 0;
  
  while (attempts < MAX_RETRY_ATTEMPTS) {
  try {
      attempts++;
      console.log(`Attempt ${attempts} to get purchased templates for user ${userId}`);
      
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.purchasedTemplates || [];
    } else {
      return [];
    }
  } catch (error: any) {
      if (error.code === 'unavailable' || error.code === 'resource-exhausted' || error.name === 'FirebaseError') {
        console.error(`Firestore error on attempt ${attempts}:`, error);
        
        // If we haven't reached max retries, wait and retry
        if (attempts < MAX_RETRY_ATTEMPTS) {
          console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
          await delay(RETRY_DELAY_MS * attempts); // Exponential backoff
          continue;
        }
      }
      
      console.error("Failed to get purchased templates after multiple attempts:", error);
      return [];
    }
  }
  
  // If we've exhausted all retries
  return [];
}

// Fallback function for local development or when Firestore is unavailable
// This allows users to access templates even when Firestore is down
export async function addPurchasedTemplateLocally(templateId: string): Promise<void> {
  try {
    const localPurchases = getPurchasedTemplatesLocally();
    if (!localPurchases.includes(templateId)) {
      localPurchases.push(templateId);
      localStorage.setItem('purchasedTemplates', JSON.stringify(localPurchases));
    }
    console.log(`Added template ${templateId} to local storage`);
  } catch (error) {
    console.error("Failed to add purchased template to local storage:", error);
    }
}

// Get locally stored purchased templates
export function getPurchasedTemplatesLocally(): string[] {
  try {
    const stored = localStorage.getItem('purchasedTemplates');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get purchased templates from local storage:", error);
    return [];
  }
}

// Check if a template is purchased (checks both Firestore and local storage)
export async function isTemplatePurchased(userId: string | null, templateId: string): Promise<boolean> {
  // Check local storage first
  try {
    const localPurchases = getPurchasedTemplatesLocally();
    if (localPurchases.includes(templateId)) {
      return true;
    }
  } catch (error) {
    console.error("Error checking local purchases:", error);
  }

  // If user is logged in, check Firestore
  if (userId) {
    try {
      const purchases = await getPurchasedTemplates(userId);
      return purchases.includes(templateId);
    } catch (error) {
      console.error("Error checking Firestore purchases:", error);
    }
  }
  
  return false;
}
