'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { addPurchasedTemplate, addPurchasedTemplateLocally } from '@/services/user'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

declare var Razorpay: any;

interface CheckoutButtonProps {
  templateId: string;
  templateName: string;
  templatePrice?: number;
}

export function CheckoutButton({ templateId, templateName, templatePrice }: CheckoutButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to make a purchase.",
        });
        router.push(`/login?redirect=/buy/${templateId}`);
        return;
    }
    
    setIsLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1DPvlr6YqO1Z3Y', // Use your test key
      amount: (templatePrice || 49) * 100, // Amount in paise
      currency: "INR",
      name: "ResumeRender",
      description: `Purchase of ${templateName} Template`,
      image: "https://placehold.co/100x100.png",
      handler: async function (response: any) {
        try {
            // Always store locally first for immediate access
            await addPurchasedTemplateLocally(templateId);
            
            // Then try to store in Firestore
        try {
            await addPurchasedTemplate(user.uid, templateId);
                console.log('Template successfully added to Firestore');
            } catch (firestoreError) {
                console.warn('Failed to save to Firestore, but template is available locally:', firestoreError);
                // Continue with local storage only
            }
            
            toast({
                title: "Payment Successful!",
                description: "You're being redirected to the editor.",
            });
            router.push(`/editor/${templateId}`);
        } catch (error) {
            console.error("Failed to save purchase:", error);
            toast({
                variant: "destructive",
                title: "Purchase Error",
                description: "Your payment was successful, but we failed to save your purchase. Please contact support.",
            });
        } finally {
            setIsLoading(false);
        }
      },
      prefill: {
        name: user.displayName || "Test User",
        email: user.email || "test.user@example.com",
        contact: "9999999999"
      },
      notes: {
        template_id: templateId,
        user_id: user.uid,
      },
      theme: {
        color: "#111827" // A neutral dark gray
      },
      modal: {
        ondismiss: function() {
            setIsLoading(false);
        }
      }
    };
    
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response: any){
        toast({
            variant: "destructive",
            title: "Payment Failed",
            description: response.error.description,
        });
        setIsLoading(false);
    });
    rzp.open();
  }

  return (
    <Button onClick={handlePayment} className="w-full" size="lg" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Buy Now for ₹{templatePrice}
    </Button>
  )
}
