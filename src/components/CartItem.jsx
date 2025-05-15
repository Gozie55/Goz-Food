import { currencyFormatter } from "../Utility/formatting";

export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button 
          onClick={onDecrease} 
          disabled={quantity === 1} // Disable the button if quantity is 1
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
