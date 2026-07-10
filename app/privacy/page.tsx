import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy — Furnizo",
  description: "Learn how we protect and handle your personal data at Furnizo.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-3xl w-full px-4 sm:px-6">
        {/* Title */}
        <div className="space-y-4 mb-16">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Legal
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
            Your privacy is of fundamental importance to our studio. This policy details how we securely gather, handle, and protect your personal information.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 font-sans text-sm text-furnizo-muted font-light leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              1. Information We Collect
            </h2>
            <p>
              We gather information necessary to process your transactions and improve your design studio experience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-furnizo-charcoal font-medium">Personal Details:</strong> Name, shipping address, billing details, phone number, and email address provided during checkout.
              </li>
              <li>
                <strong className="text-furnizo-charcoal font-medium">Browser Data:</strong> IP address, device type, cookie identifiers, and navigation patterns on our storefront.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              2. How We Use Your Data
            </h2>
            <p>
              Your personal information is strictly used to fulfill our catalog orders and maintain communication:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Fulfilling orders, processing payments, and arranging delivery logistics.</li>
              <li>Providing transaction receipts, shipping notices, and customer support queries.</li>
              <li>Improving our architectural display layout and web experience.</li>
              <li>Sending occasional curated newsletters (only if you have opted in).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              3. Data Sharing & Security
            </h2>
            <p>
              Furnizo does not sell, lease, or trade your personal information to third parties. We share data only with trusted partners essential to operating our storefront (e.g., payment gateways like Stripe, logistics shipping carriers).
            </p>
            <p>
              All transactions are encrypted using secure socket layer technology (SSL) and follow standard PCI-DSS requirements.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              4. Cookies Policy
            </h2>
            <p>
              Our website uses small cookie data files to store your current cart contents, wishlist selections, and remember your session. You can manage or disable cookies in your web browser preferences at any time.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
