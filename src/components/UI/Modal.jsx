import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    return () => modal.close();
  }, [open]);

  // Ensure that the modal element exists in the DOM
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    console.error("Modal root element '#modal' is missing in the DOM!");
    return null; // Avoid rendering the portal if the modal root is missing
  }

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    modalRoot
  );
}
