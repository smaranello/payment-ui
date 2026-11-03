import { motion } from "motion/react";
import PaymentCardUX from "./PaymentCardUX";
import PaymentCardBackUX from "./PaymentCardBackUX";

const flipTransition = {
  type: "spring",
  bounce: 0.12,
  visualDuration: 0.45,
};

export default function PaymentCardScene({
  showBackCard,
  focusField,
  name,
  expiryDate,
  cardNumber,
  cardType,
  cvv,
}) {
  return (
    <div className="flex h-full items-center justify-center bg-sky-100/50 p-4">
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
              focusField={focusField}
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
    </div>
  );
}
