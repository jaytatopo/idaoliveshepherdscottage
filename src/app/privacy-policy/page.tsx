import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                        <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p>This is a placeholder for your privacy policy. A privacy policy is a statement or a legal document that discloses some or all of the ways a party gathers, uses, discloses, and manages a customer or client's data. It fulfills a legal requirement to protect a customer or client's privacy.</p>
                            
                            <h2 className="font-serif">1. Information We Collect</h2>
                            <p>We collect information that you provide to us directly, such as when you fill out our inquiry form. This may include your name, email address, phone number, and booking details.</p>
                            
                            <h2 className="font-serif">2. How We Use Your Information</h2>
                            <p>We use the information we collect to respond to your inquiries, process your bookings, and communicate with you about your stay. We do not sell or share your personal information with third parties for marketing purposes.</p>
                            
                            <h2 className="font-serif">3. Cookies</h2>
                            <p>Our website uses cookies to enhance your browsing experience and to help us understand how our site is used. A cookie is a small file placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

                            <h2 className="font-serif">4. Data Security</h2>
                            <p>We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>

                            <h2 className="font-serif">5. Changes to This Policy</h2>
                            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                            <h2 className="font-serif">6. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, you can contact us at our provided email address.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
