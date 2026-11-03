import { useState } from "react";
import Card from "./components/Card";
import PaymentHeader from "./components/PaymentHeader";
import PaymentForm from "./components/PaymentForm";
import PaymentCardUX from "./components/PaymentCardUX";

export default function App() {
  const [focusField, setFocusField] = useState(null);
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <PaymentHeader />
        <div className="grid w-full grid-cols-2">
          <PaymentCardUX
            focusField={focusField}
            setFocusField={setFocusField}
            name={name}
            setName={setName}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
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
          />
        </div>
      </Card>
    </div>
  );
}
