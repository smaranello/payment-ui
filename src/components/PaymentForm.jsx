import { useState } from "react";
import {
  UserIcon,
  CreditCardIcon,
  CalendarIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export default function PaymentForm({
  setFocusField,
  name,
  setName,
  expiryDate,
  setExpiryDate,
  cardNumber,
  setCardNumber,
  cvv,
  setCvv,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <p className="text-gray-500 text-sm mb-4">
          Enter your card details to complete the transaction.
        </p>
        <label htmlFor="name" className="text-sm font-bold text-gray-500">
          Name on Card
        </label>
        <div className="relative mb-2">
          <UserIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="name"
            value={name || ""}
            onFocus={() => setFocusField("name")}
            onBlur={() => setFocusField(null)}
            onChange={(e) =>
              setName(
                e.target.value
                  .replace(/[^\p{L}\s'.-]/gu, "")
                  .replace(/\s+/g, " "),
              )
            }
            autoComplete="cc-name"
            className="w-full rounded-md border border-gray-300 py-2 pr-2 pl-9"
          />
        </div>
        <label htmlFor="cardNumber" className="text-sm font-bold text-gray-500">
          Card Number
        </label>
        <div className="relative mb-2">
          <CreditCardIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="cardNumber"
            value={cardNumber || ""}
            onFocus={() => setFocusField("cardNumber")}
            onBlur={() => setFocusField(null)}
            onChange={(e) =>
              setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
            }
            inputMode="numeric"
            maxLength={16}
            className="w-full rounded-md border border-gray-300 py-2 pr-2 pl-9"
          />
        </div>
        <div className="mb-6 grid w-full grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="text-sm font-bold text-gray-500"
            >
              Expiry Date
            </label>
            <div className="relative">
              <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="expiryDate"
                value={expiryDate || ""}
                onFocus={() => setFocusField("expiry")}
                onBlur={() => setFocusField(null)}
                onChange={(e) => {
                  const raw = e.target.value;
                  const digits = raw.replace(/\D/g, "").slice(0, 4);
                  const prev = expiryDate || "";
                  const isDeleting = raw.length < prev.length;

                  if (digits.length === 0) {
                    setExpiryDate("");
                  } else if (digits.length < 2) {
                    setExpiryDate(digits);
                  } else if (digits.length === 2) {
                    // Add slash as soon as month is complete; allow backspace to remove it
                    setExpiryDate(isDeleting ? digits : `${digits}/`);
                  } else {
                    setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`);
                  }
                }}
                inputMode="numeric"
                maxLength={5}
                className="w-full rounded-md border border-gray-300 py-2 pr-2 pl-9"
                placeholder="MM/YY"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cvv" className="text-sm font-bold text-gray-500">
              CVV
            </label>
            <div className="relative">
              <KeyIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="cvv"
                value={cvv || ""}
                onFocus={() => setFocusField("cvv")}
                onBlur={() => setFocusField(null)}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                }
                inputMode="numeric"
                maxLength={3}
                className="w-full rounded-md border border-gray-300 py-2 pr-2 pl-9"
                placeholder="123"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[var(--blue-bg)] p-2 text-white"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}
