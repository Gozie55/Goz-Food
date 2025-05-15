export default function Button({ children, textOnly, className = "", ...props }) {
  // Initialize the base classes
  let cssClasses = textOnly ? "text-button" : "button";

  // Append the additional class if provided
  cssClasses += className ? ` ${className}` : "";

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
