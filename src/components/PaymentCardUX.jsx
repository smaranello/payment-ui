import { AnimatePresence, motion } from "motion/react";

const CARD_LOGOS = {
  visa: "/visa.svg",
  mastercard: "/mastercard.svg",
  amex: "/amex.svg",
};

// Spring used when a digit slides in/out of a card number slot
const digitTransition = {
  type: "spring",
  bounce: 0.18,
  visualDuration: 0.22,
};

// One card-number slot: shows a grey dot until a digit is typed,
// then animates that digit in from the bottom (and out on delete)
function CardDigit({ digit, index }) {
  return (
    <span className="payment-card-digit">
      <AnimatePresence mode="wait" initial={false}>
        {digit ? (
          <motion.span
            key={`digit-${index}-${digit}`}
            className="payment-card-digit-value"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={digitTransition}
          >
            {digit}
          </motion.span>
        ) : (
          <motion.span
            key={`dot-${index}`}
            className="dot"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.12 }}
          />
        )}
      </AnimatePresence>
    </span>
  );
}

// Renders one group of 4 digits (e.g. startIndex 0 -> digits 1-4)
function DigitGroup({ digits, startIndex }) {
  return (
    <div className="payment-card-digit-group">
      {Array.from({ length: 4 }, (_, offset) => {
        const index = startIndex + offset;
        return <CardDigit key={index} index={index} digit={digits[index]} />;
      })}
    </div>
  );
}

export default function PaymentCardUX({
  focusField,
  name,
  expiryDate,
  cardNumber,
  cardType,
}) {
  // Keep only digits so spaces/letters don't shift the 16 card slots
  const digits = (cardNumber || "").replace(/\D/g, "").slice(0, 16);

  return (
    <div
      className={`payment-card-ux${cardType && cardType !== "unknown" ? ` card-${cardType}` : ""}`}
    >
      <div className="payment-card-top">
        <div className="payment-card-chip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="payment-card-logo">
          {CARD_LOGOS[cardType] && (
            <img
              className={`payment-card-logo-img payment-card-logo-${cardType}`}
              src={CARD_LOGOS[cardType]}
              alt={cardType}
            />
          )}
        </div>
      </div>
      <div
        className={`payment-card-number ${focusField === "cardNumber" ? "is-focused" : ""}`}
      >
        <DigitGroup digits={digits} startIndex={0} />
        <DigitGroup digits={digits} startIndex={4} />
        <DigitGroup digits={digits} startIndex={8} />
        <DigitGroup digits={digits} startIndex={12} />
      </div>
      <div className="payment-cardholder-name-expiry">
        <div
          className={`payment-cardholder-name ${focusField === "name" ? "is-focused" : ""}`}
        >
          <span className="payment-card-label">CARDHOLDER NAME</span>
          <span className="payment-card-value">
            {name ? name.toUpperCase() : "\u00A0"}
          </span>
        </div>
        <div
          className={`payment-cardholder-expiry ${focusField === "expiry" ? "is-focused" : ""}`}
        >
          <span className="payment-card-label">EXPIRY DATE</span>
          <span className="payment-card-value">
            {expiryDate ? expiryDate : "\u00A0"}
          </span>
        </div>
      </div>
    </div>
  );
}
