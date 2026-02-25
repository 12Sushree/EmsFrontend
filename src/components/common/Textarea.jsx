import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea(
  { placeholder, rows = 5, className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={`input ${className}`}
        {...props}
      />
    </div>
  );
});

export default Textarea;
