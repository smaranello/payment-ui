import logo from "../../public/logo.png";

export default function PaymentHeader() {
  return (
    <div className="flex w-full justify-between items-center border-b border-gray-200 p-4">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
        <p>Payment System</p>
      </div>
      <div className="flex items-center gap-4">
        <a href="/customer-details" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center text-white font-bold bg-[var(--blue-bg)] rounded-full">
            1
          </div>
          Customer Details
        </a>
        <a href="/address-details" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center text-white font-bold bg-[var(--blue-bg)] rounded-full">
            2
          </div>
          Address Details
        </a>
        <a href="/payment-method" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center text-white font-bold bg-[var(--blue-bg)] rounded-full">
            3
          </div>
          Payment Method
        </a>
      </div>
    </div>
  );
}
