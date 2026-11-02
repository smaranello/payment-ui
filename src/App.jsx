import Card from "./components/Card";
import PaymentHeader from "./components/PaymentHeader";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <PaymentHeader />
      </Card>
    </div>
  );
}
