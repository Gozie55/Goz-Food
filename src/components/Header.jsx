import { useContext } from "react";
import CartContext from "../store/CartContext";
import logoImg from "../assets/logo.jpg"; // Ensure this is the correct path
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext"; // Correct import for UserProgressContext

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="GozFood logo" />
        <h1>GozFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart} title="View your cart">
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
