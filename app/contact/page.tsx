"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Mock network request
    setTimeout(() => {
      toast.success("Message sent successfully! Our studio will respond shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-furnizo-beige">
      <Navbar />

      <main className="flex-grow py-16 sm:py-24 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact details */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-furnizo-brown">
                Get In Touch
              </span>
              <h1 className="font-sans text-3xl sm:text-5xl font-light text-furnizo-charcoal tracking-wide leading-tight">
                Connect With Our Studio
              </h1>
              <p className="font-sans text-sm sm:text-base text-furnizo-muted font-light leading-relaxed max-w-md">
                Whether seeking custom sizing, shipping updates, or trade catalog access, our team is here to assist you.
              </p>
            </div>

            {/* Studio Info List */}
            <div className="space-y-6 font-sans text-sm text-furnizo-muted font-light">
              <div className="flex items-start gap-4">
                <MapPin className="text-furnizo-brown h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-furnizo-charcoal mb-0.5">Showroom & Design Studio</h4>
                  <p>148 Oiled Ash Avenue, Ground Floor</p>
                  <p>Copenhagen, 1050 Denmark</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-furnizo-brown h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-furnizo-charcoal mb-0.5">Electronic Inquiries</h4>
                  <p className="hover:text-furnizo-brown transition-colors cursor-pointer">studio@furnizo.design</p>
                  <p className="hover:text-furnizo-brown transition-colors cursor-pointer">support@furnizo.design</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-furnizo-brown h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-furnizo-charcoal mb-0.5">Direct Line</h4>
                  <p className="hover:text-furnizo-brown transition-colors cursor-pointer">+45 91 82 73 64</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-furnizo-brown h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-furnizo-charcoal mb-0.5">Operating Hours</h4>
                  <p>Monday – Friday: 09:00 – 18:00 (CET)</p>
                  <p>Saturday: 10:00 – 15:00 (CET)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="border border-furnizo-border bg-white rounded-xl p-8 sm:p-10 shadow-sm">
            <h3 className="font-sans text-lg font-light text-furnizo-charcoal tracking-wide mb-6">
              Send An Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-sans text-[10px] font-semibold uppercase tracking-wider text-furnizo-muted">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-furnizo-beige/30 border border-furnizo-border rounded px-4 py-2.5 text-xs font-sans text-furnizo-charcoal placeholder-furnizo-muted/40 focus:outline-hidden focus:border-furnizo-brown/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-sans text-[10px] font-semibold uppercase tracking-wider text-furnizo-muted">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-furnizo-beige/30 border border-furnizo-border rounded px-4 py-2.5 text-xs font-sans text-furnizo-charcoal placeholder-furnizo-muted/40 focus:outline-hidden focus:border-furnizo-brown/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-sans text-[10px] font-semibold uppercase tracking-wider text-furnizo-muted">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-furnizo-beige/30 border border-furnizo-border rounded px-4 py-2.5 text-xs font-sans text-furnizo-charcoal placeholder-furnizo-muted/40 focus:outline-hidden focus:border-furnizo-brown/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="font-sans text-[10px] font-semibold uppercase tracking-wider text-furnizo-muted">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-furnizo-beige/30 border border-furnizo-border rounded px-4 py-2.5 text-xs font-sans text-furnizo-charcoal placeholder-furnizo-muted/40 focus:outline-hidden focus:border-furnizo-brown/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-charcoal disabled:bg-furnizo-muted font-sans text-xs tracking-widest uppercase py-3 rounded-md transition-colors cursor-pointer"
              >
                {isSubmitting ? "Dispatching..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
