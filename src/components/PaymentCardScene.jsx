import { motion } from "motion/react";
import PaymentCardUX from "./PaymentCardUX";
import PaymentCardBackUX from "./PaymentCardBackUX";

const flipTransition = {
  type: "spring",
  bounce: 0.08,
  visualDuration: 0.85,
};

export default function PaymentCardScene({
  isProcessing,
  showBackCard,
  focusField,
  name,
  expiryDate,
  cardNumber,
  cardType,
  cvv,
}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center bg-sky-100/50 px-8 py-12 ${
        isProcessing ? "h-full min-h-full flex-1 gap-6" : "h-full"
      }`}
    >
      <div className="payment-card-scene">
        <motion.div
          className="payment-card-flipper"
          initial={false}
          animate={{ rotateY: showBackCard ? 180 : 0 }}
          transition={flipTransition}
          style={{
            transformStyle: "preserve-3d",
            transformPerspective: 1200,
          }}
        >
          <div className="payment-card-face payment-card-face-front">
            <PaymentCardUX
              focusField={isProcessing ? null : focusField}
              name={name}
              expiryDate={expiryDate}
              cardNumber={cardNumber}
              cardType={cardType}
            />
          </div>
          <div className="payment-card-face payment-card-face-back">
            <PaymentCardBackUX cvv={cvv} cardType={cardType} />
          </div>
        </motion.div>
      </div>
      {isProcessing && (
        <p className="text-sm font-medium text-slate-700">
          Processing Secure Transaction...
        </p>
      )}
    </div>
  );
}
