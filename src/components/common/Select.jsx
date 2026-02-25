import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { options = [], placeholder = "Select an option", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full space-y-1">
      <select id={id} ref={ref} className={`input ${className}`} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option["value"]} value={option["value"]}>
            {option["label"]}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
