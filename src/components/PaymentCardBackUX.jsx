export default function PaymentCardBackUX({ cvv, cardType }) {
  return (
    <div
      className={`payment-card-back-ux${cardType && cardType !== "unknown" ? ` card-${cardType}` : ""}`}
    >
      <div className="payment-card-magnetic-stripe" aria-hidden="true" />
      <div className="payment-card-cvv-band">
        <span className="payment-card-cvv-label">CVV</span>
        <span className="payment-card-cvv-value">{cvv || "\u00A0"}</span>
      </div>
    </div>
  );
}
