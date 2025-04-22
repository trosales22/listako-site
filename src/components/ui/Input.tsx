import { FC, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  className?: string;
  ghost?: boolean;
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fieldset?: boolean;
  legend?: string;
  requirementLabel?: string;
  requirementColor?: string;
}

const Input: FC<InputProps> = ({
  label,
  icon,
  badge,
  className = "",
  ghost,
  color,
  size,
  fieldset,
  legend,
  requirementLabel = '',
  requirementColor = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  const inputClass = [
    "w-full",
    "bg-transparent",
    "outline-none",
    "text-sm md:text-base",
    "px-3 py-2",
    ghost ? "input-ghost" : "border rounded-md",
    color ? `input-${color}` : "border-gray-300 focus:border-blue-500",
    size === "xs" ? "text-xs" :
    size === "sm" ? "text-sm" :
    size === "lg" ? "text-lg" :
    size === "xl" ? "text-xl" : "",
    className,
  ].filter(Boolean).join(" ");

  if (fieldset) {
    return (
      <fieldset className="w-full">
        {legend && <legend className="mb-1 text-sm text-gray-600">{legend}</legend>}
        <input className={inputClass} {...props} />
        {requirementLabel && <p className={`text-xs mt-1 ${requirementColor}`}>{requirementLabel}</p>}
      </fieldset>
    );
  }

  return (
    <div className="relative w-full">
      {label && (
        <label
          className={`absolute left-3 pointer-events-none transition-all duration-200 text-gray-500 ${
            isFocused || hasValue ? "text-xs top-1" : "top-1/2 -translate-y-1/2 text-sm"
          }`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center border rounded-md px-2 py-1 bg-white w-full">
        {icon && <span className="mr-2 opacity-60">{icon}</span>}
        <input
          className="flex-1 bg-transparent text-sm md:text-base outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {badge && <span className="ml-2">{badge}</span>}
      </div>
    </div>
  );
};

export default Input;
