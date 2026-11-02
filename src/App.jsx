import Card from "./components/Card";
import PaymentHeader from "./components/PaymentHeader";
import PaymentForm from "./components/PaymentForm";
import PaymentCardUX from "./components/PaymentCardUX";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <PaymentHeader />
        <div className="grid w-full grid-cols-2">
          <PaymentCardUX />
          <PaymentForm />
        </div>
      </Card>
    </div>
  );
}
