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
  onPay,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    const trimmedName = (name || "").trim();
    const digits = (cardNumber || "").replace(/\D/g, "");
    const expiryDigits = (expiryDate || "").replace(/\D/g, "");
    const month = Number(expiryDigits.slice(0, 2));
    const isAmex = /^3[47]/.test(digits);
    const expectedCardLength = isAmex ? 15 : 16;

    if (!trimmedName) {
      nextErrors.name = "Enter the name on the card";
    }

    if (digits.length !== expectedCardLength) {
      nextErrors.cardNumber = `Enter a valid ${expectedCardLength}-digit card number`;
    }

    if (
      expiryDigits.length !== 4 ||
      month < 1 ||
      month > 12
    ) {
      nextErrors.expiryDate = "Enter a valid expiry date (MM/YY)";
    }

    if (!(cvv || "").replace(/\D/g, "").match(/^\d{3}$/)) {
      nextErrors.cvv = "Enter a valid 3-digit CVV";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onPay();
  };

  const fieldClass = (hasError) =>
    `w-full rounded-md border py-2 pr-2 pl-9 ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <p className="text-gray-500 text-sm mb-4">
          Enter your card details to complete the transaction.
        </p>
        <label htmlFor="name" className="text-sm font-bold text-gray-500">
          Name on Card
        </label>
        <div className="relative mb-1">
          <UserIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="name"
            value={name || ""}
            onFocus={() => setFocusField("name")}
            onBlur={() => setFocusField(null)}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, name: undefined }));
              setName(
                e.target.value
                  .replace(/[^\p{L}\s'.-]/gu, "")
                  .replace(/\s+/g, " "),
              );
            }}
            autoComplete="cc-name"
            className={fieldClass(errors.name)}
          />
        </div>
        {errors.name && (
          <p className="mb-2 text-xs text-red-500">{errors.name}</p>
        )}
        <label htmlFor="cardNumber" className="text-sm font-bold text-gray-500">
          Card Number
        </label>
        <div className="relative mb-1">
          <CreditCardIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="cardNumber"
            value={cardNumber || ""}
            onFocus={() => setFocusField("cardNumber")}
            onBlur={() => setFocusField(null)}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, cardNumber: undefined }));
              setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16));
            }}
            inputMode="numeric"
            maxLength={16}
            className={fieldClass(errors.cardNumber)}
          />
        </div>
        {errors.cardNumber && (
          <p className="mb-2 text-xs text-red-500">{errors.cardNumber}</p>
        )}
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
                  setErrors((prev) => ({ ...prev, expiryDate: undefined }));
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
                className={fieldClass(errors.expiryDate)}
                placeholder="MM/YY"
              />
            </div>
            {errors.expiryDate && (
              <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
            )}
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
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, cvv: undefined }));
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
                }}
                inputMode="numeric"
                maxLength={3}
                className={fieldClass(errors.cvv)}
                placeholder="123"
              />
            </div>
            {errors.cvv && (
              <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 transaction-amount">
          <p className="text-gray-600 text-sm">Transaction Amount:</p>
          <p className="text-lg font-bold text-blue-600">$100.00</p>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[var(--blue-bg)] p-2 text-white cursor-pointer"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}
