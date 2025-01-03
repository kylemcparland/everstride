import "./PurchaseGoldStripe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const PurchaseGoldStripe = () => {
  return (
    <div className="PurchaseGoldStripe">
      <div className="PurchaseGoldStripe-ad">
        <h3>Purchase 20 Gold for only $5!</h3>
      </div>
      <a href="/purchase-gold" className="PurchaseGoldStripe-link">
        <button className="PurchaseGoldStripe-button">
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          <h2>Secure payment with Stripe</h2>
        </button>
      </a>
    </div>
  );
};

export default PurchaseGoldStripe;