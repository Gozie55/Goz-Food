import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../Utility/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext"; // Corrected import
import useHttp from "../hooks/useHttp";

import Input from "./UI/input"; // Ensure this import is correct

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  // const useHttp = (url, config) => {
  //   const [data, setData] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(null);
  
  //   const sendRequest = async (body) => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(url, {
  //         ...config,
  //         body,
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }
  
  //       const resData = await response.json();
  //       setData(resData); // ✅ Important
  //     } catch (err) {
  //       setError(err);
  //     }
  //     setIsLoading(false);
  //   };
  
  //   const clearData = () => setData(null);
  
  //   return {
  //     data,
  //     isLoading,
  //     error,
  //     sendRequest,
  //     clearData,
  //   };
  // };
  

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your Order was submitted successfully</p>
        <p>We will get back to you shortly</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Fullname" id="name" type="text" required />
        <Input label="Email" id="email" type="email" required />
        <Input label="Address" id="street" type="text" required />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" required />
          <Input label="City" id="city" type="text" required />
        </div>

        {error && <p>{error.message || "Something went wrong."}</p>}

        {/* {error && <Error title="Failed to submit order" message={error} />} */}

        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
