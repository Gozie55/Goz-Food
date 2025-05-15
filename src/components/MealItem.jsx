import { currencyFormatter } from "../Utility/formatting.jsx";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal); // Adds the meal to the cart context
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p>{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button
            onClick={handleAddMealToCart}
            aria-label={`Add ${meal.name} to cart`}
          >
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
}
