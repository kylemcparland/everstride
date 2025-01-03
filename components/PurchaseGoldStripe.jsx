import "./PurchaseGoldStripe.css";

const PurchaseGoldStripe = () => {
  return (
    <div className="PurchaseGoldStripe">
      <span>Purchase 20 Gold for only $5!</span>
      <a href="/purchase-gold" className="PurchaseGoldStripe-link">
        <button className="PurchaseGoldStripe-button">
          <h2>Secure payment with Stripe</h2>
        </button>
      </a>
    </div>
  );
};

export default PurchaseGoldStripe;
