import React, { createContext, useState } from "react";

const ProgressStages = {
  CART: "cart",
  CHECKOUT: "checkout",
  NONE: "",
};

// Create UserProgressContext
export const UserProgressContext = createContext({
  progress: ProgressStages.NONE,
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

// UserProgressContextProvider Component
export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState(ProgressStages.NONE);

  function showCart() {
    setUserProgress(ProgressStages.CART);
  }

  function hideCart() {
    setUserProgress(ProgressStages.NONE);
  }

  function showCheckout() {
    setUserProgress(ProgressStages.CHECKOUT);
  }

  function hideCheckout() {
    setUserProgress(ProgressStages.NONE);
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
