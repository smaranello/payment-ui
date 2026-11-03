import { useState } from "react";
import Card from "./components/Card";
import PaymentHeader from "./components/PaymentHeader";
import PaymentForm from "./components/PaymentForm";
import PaymentCardScene from "./components/PaymentCardScene";

function getCardType(number) {
  const card = number.replace(/\s/g, "");

  if (/^4/.test(card)) return "visa";
  if (/^(5[1-5]|2(2[2-9]|[3-6][0-9]|7[01]|720))/.test(card))
    return "mastercard";
  if (/^3[47]/.test(card)) return "amex";

  return "unknown";
}

export default function App() {
  const [focusField, setFocusField] = useState(null);
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  // Derive type from the current number so the logo updates as the user types
  const cardType = getCardType(cardNumber);
  const showBackCard = focusField === "cvv";

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <PaymentHeader />
        <div className="grid w-full grid-cols-2">
          <PaymentCardScene
            showBackCard={showBackCard}
            focusField={focusField}
            name={name}
            expiryDate={expiryDate}
            cardNumber={cardNumber}
            cardType={cardType}
            cvv={cvv}
          />
          <PaymentForm
            focusField={focusField}
            setFocusField={setFocusField}
            name={name}
            setName={setName}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cvv={cvv}
            setCvv={setCvv}
          />
        </div>
      </Card>
    </div>
  );
}
