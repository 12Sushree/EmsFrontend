import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { placeholder, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      <input
        type={type}
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={`input ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
