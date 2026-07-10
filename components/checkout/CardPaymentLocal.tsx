"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface Props {
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
}

export default function CardPaymentLocal({ cardDetails, setCardDetails }: Props) {
  return (
    <div className="border border-furnizo-border bg-white rounded-lg p-5 space-y-4 mt-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-furnizo-muted">Simulated Transaction Details</span>
        <span className="flex items-center gap-1 text-[9px] font-sans text-furnizo-muted">
          <Lock size={10} /> Secure Checkout
        </span>
      </div>
      
      {/* Cardholder Name */}
      <div className="space-y-1.5">
        <Label htmlFor="cardName" className="font-sans text-[10px] text-furnizo-charcoal uppercase tracking-wider">Cardholder Name</Label>
        <Input
          id="cardName"
          type="text"
          placeholder="Jane Doe"
          value={cardDetails.name}
          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
          required
          className="bg-transparent border-furnizo-border rounded font-sans text-xs h-10 focus-visible:ring-furnizo-brown"
        />
      </div>

      {/* Card Number */}
      <div className="space-y-1.5">
        <Label htmlFor="cardNumber" className="font-sans text-[10px] text-furnizo-charcoal uppercase tracking-wider">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="4111 2222 3333 4444"
          maxLength={19}
          value={cardDetails.number}
          onChange={(e) => {
            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setCardDetails(prev => ({ ...prev, number: val }));
          }}
          required
          className="bg-transparent border-furnizo-border rounded font-sans text-xs h-10 focus-visible:ring-furnizo-brown"
        />
      </div>

      {/* Expiry & CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="cardExpiry" className="font-sans text-[10px] text-furnizo-charcoal uppercase tracking-wider">Expiry Date</Label>
          <Input
            id="cardExpiry"
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={cardDetails.expiry}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");
              if (val.length > 2) {
                val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
              }
              setCardDetails(prev => ({ ...prev, expiry: val }));
            }}
            required
            className="bg-transparent border-furnizo-border rounded font-sans text-xs h-10 focus-visible:ring-furnizo-brown"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cardCvc" className="font-sans text-[10px] text-furnizo-charcoal uppercase tracking-wider">CVC</Label>
          <Input
            id="cardCvc"
            type="password"
            placeholder="123"
            maxLength={3}
            value={cardDetails.cvc}
            onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, "") }))}
            required
            className="bg-transparent border-furnizo-border rounded font-sans text-xs h-10 focus-visible:ring-furnizo-brown"
          />
        </div>
      </div>
    </div>
  );
}
