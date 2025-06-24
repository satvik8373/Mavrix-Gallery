'use client'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose lg:prose-xl mx-auto">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>Your privacy is important to us. It is ResumeRender's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        
        <h2>1. Information We Collect</h2>
        <p><strong>Account Information:</strong> We use Firebase Authentication to manage user accounts. When you sign up, we collect and store your email address to identify you and secure your account. We do not store your password directly; it is handled securely by Firebase.</p>
        <p><strong>Resume Data:</strong> All information you enter into the resume builder—such as your name, contact details, work experience, and skills—is processed and stored locally in your browser using `localStorage`. This data does not leave your computer unless you choose to save it to your account (feature coming soon).</p>
        
        <h2>2. How We Use Information</h2>
        <p>The data you provide is used solely for the purpose of populating your selected resume template and allowing you to manage your resumes. It allows you to create, edit, and preview your resume within your browser session.</p>

        <h2>3. Payments</h2>
        <p>For premium templates, we use Razorpay as our payment processor. When you make a payment, you are providing your payment information directly to Razorpay. We do not handle or store your credit card details. We encourage you to review Razorpay's privacy policy to understand how they handle their data.</p>
        
        <h2>4. Cookies and Local Storage</h2>
        <p>We use `localStorage` to save your resume progress. This is a standard web technology that allows websites to store data in your browser. This is essential for the functionality of our service, ensuring your work is not lost if you close the tab or browser. We do not use tracking cookies for advertising purposes.</p>

        <h2>5. Your Consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        
        <h2>6. Changes to Our Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
      </div>
    </div>
  );
}
