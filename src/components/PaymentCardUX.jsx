export default function PaymentCardUX() {
  return (
    <div className="flex items-center justify-center bg-sky-100/50 p-4">
      <div className="payment-card-ux">
        <div className="payment-card-top">
          <div className="payment-card-chip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="payment-card-logo"></div>
        </div>
        <div className="payment-card-number">
          <div className="flex items-center gap-2">
            <span className="dot num-1"></span>
            <span className="dot num-2"></span>
            <span className="dot num-3"></span>
            <span className="dot num-4"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="dot num-5"></span>
            <span className="dot num-6"></span>
            <span className="dot num-7"></span>
            <span className="dot num-8"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="dot num-9"></span>
            <span className="dot num-10"></span>
            <span className="dot num-11"></span>
            <span className="dot num-12"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="dot num-13"></span>
            <span className="dot num-14"></span>
            <span className="dot num-15"></span>
            <span className="dot num-16"></span>
          </div>
        </div>
        <div className="payment-cardholder-name-expiry flex items-center gap-2">
          <div className="payment-cardholder-name text-white text-xs">
            CARDHOLDER NAME
          </div>
          <div className="payment-cardholder-expiry text-white text-xs">
            EXPIRY DATE
          </div>
        </div>
      </div>
    </div>
  );
}
