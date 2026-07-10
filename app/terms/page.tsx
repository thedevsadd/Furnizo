import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions — Furnizo",
  description: "Read the terms of service governing the use of the Furnizo website.",
};

export default function TermsConditionsPage() {
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
            Terms & Conditions
          </h1>
          <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
            These terms govern your access to and purchase of products from the Furnizo online catalog. By browsing our website, you agree to these guidelines.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 font-sans text-sm text-furnizo-muted font-light leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              1. Store Agreement & Use
            </h2>
            <p>
              By visiting our site or purchasing items, you represent that you are at least the age of majority in your state or country of residence. You agree not to use our premium designs or materials for any unauthorized or illegal activity.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              2. Pricing & Product Descriptions
            </h2>
            <p>
              All prices shown in our catalog are subject to change without notice. We reserve the right to limit the sales of our architectural pieces to any person or geographic region.
            </p>
            <p>
              We have made every effort to display as accurately as possible the colors and finishes of our timber, travertine, and fabrics. However, natural materials possess organic variations (wood grains, stone crystallization) which are not considered defects.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              3. Account Registration & Billing
            </h2>
            <p>
              You agree to provide current, complete, and accurate purchase and account details for all transactions. In the event of order limits or cancellations, we will attempt to contact you via the email or phone number provided during checkout.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              4. Intellectual Property
            </h2>
            <p>
              The designs, product images, graphics, and layout on Furnizo are the intellectual property of our studio. Any replication, reproduction, or commercial use without express written consent is strictly prohibited.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
