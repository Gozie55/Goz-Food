import { CartContextProvider } from "./store/CartContext";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";
import Footer from "./components/Footer.jsx";



function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <Footer />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
