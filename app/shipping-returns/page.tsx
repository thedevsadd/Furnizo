import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Shipping & Returns — Furnizo",
  description: "Learn about our shipping options, delivery times, and returns policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-3xl w-full px-4 sm:px-6">
        {/* Title */}
        <div className="space-y-4 mb-16">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
            Policies
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-light text-furnizo-charcoal tracking-wide">
            Shipping & Returns
          </h1>
          <p className="font-sans text-xs sm:text-sm text-furnizo-muted font-light leading-relaxed">
            We hold our logistical standards to the same level of care as our craftsmanship. Read our guidelines for secure transit and stress-free return processing.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 font-sans text-sm text-furnizo-muted font-light leading-relaxed">
          
          {/* Shipping */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              Shipping & Delivery
            </h2>
            <div className="space-y-3">
              <p>
                We offer two primary options for transit:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-furnizo-charcoal font-medium">Standard Curb Delivery:</strong> Free on orders over $150. Items are securely crated and delivered to your building entrance or curb.
                </li>
                <li>
                  <strong className="text-furnizo-charcoal font-medium">White-Glove Inside Delivery:</strong> $150 flat rate. Includes indoor placement, professional assembly, and complete removal of all packaging debris.
                </li>
              </ul>
              <p>
                Shipping timeframes depend on stock availability. In-stock products typically dispatch within 2-4 business days, reaching their destination within 7-10 business days nationwide.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section className="space-y-4 border-b border-furnizo-border pb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              30-Day Return Trial
            </h2>
            <div className="space-y-3">
              <p>
                We believe you should live with a piece before deciding if it belongs in your home. We accept returns of all undamaged products within 30 days of receipt.
              </p>
              <p>
                To qualify for a refund, items must be in their original condition and, whenever possible, returned in their original packaging. A return shipping fee equal to 10% of the item purchase price will be deducted from your refund to cover freight return costs.
              </p>
              <p>
                Please note that custom-configured orders or items marked as "Final Sale" cannot be returned or exchanged.
              </p>
            </div>
          </section>

          {/* Damaged or Defective Items */}
          <section className="space-y-4 pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-furnizo-charcoal">
              Damages & Defective Claims
            </h2>
            <div className="space-y-3">
              <p>
                We inspect every piece before dispatch. However, should an item arrive damaged during shipping, please document the damage (including photos of the packaging and product) and notify us within 48 hours of receipt.
              </p>
              <p>
                We will dispatch a replacement piece immediately or coordinate a certified specialist to repair the defect at no cost to you.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
