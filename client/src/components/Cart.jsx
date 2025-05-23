import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../Utility/formatting";
import Button from "./UI/Button";
import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContext"; // Corrected import
import CartItem from "./CartItem";

export default function Cart({ onClose }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate the total price of the items in the cart
  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Close the cart modal
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  // Proceed to checkout
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={handleCloseCart} // Always pass a function for onClose
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
