# ResumeRender

This is a NextJS application built in Firebase Studio. It allows users to create professional resumes using various templates and an AI assistant.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

## Firebase Setup (Required for Authentication & Purchases)

This project uses Firebase for user authentication and storing purchase data. To enable these features, you need to create a Firebase project and add your configuration credentials.

1.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Click "Add project" and follow the setup steps.

2.  **Create a Web App:**
    *   In your project's dashboard, click the Web icon (`</>`) to add a new web app.
    *   Register your app and you will be provided with a `firebaseConfig` object.

3.  **Enable Sign-In Methods:**
    *   In the Firebase Console, go to **Authentication** (under the "Build" menu).
    *   Click the "Sign-in method" tab.
    *   **Email/Password**: Select "Email/Password" from the providers list and enable it.
    *   **Google**: Select "Google" from the providers list, enable it, and provide a project support email.

4.  **Set Up Firestore:**
    *   In the Firebase Console, go to **Firestore Database** (under the "Build" menu).
    *   Click "Create database".
    *   Start in **production mode**. This ensures your data is secure by default. Click "Next".
    *   Choose a Cloud Firestore location. This cannot be changed later. Click "Enable".
    *   **Important:** You must set up security rules to allow your app to read and write data. Go to the **Rules** tab in the Firestore Database section and use the following rules to get started. These rules allow any authenticated user to read/write their own data.

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

5.  **Update Environment Variables:**
    *   Copy the configuration values from your Firebase project's settings.
    *   Open the `.env` file in the root of this project.
    *   Replace the placeholder values with your actual Firebase credentials.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

After completing these steps, the login and purchase features will be fully functional.
#   M a v r i x - G a l l e r y  
 #   M a v r i x - G a l l e r y  
 