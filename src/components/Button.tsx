import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className,
  ...props
}) => {
  const baseStyles = "rounded-lg text-sm cursor-pointer";

  const sizeStyles = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-3",
  };

  const variantStyles = {
    primary: "bg-blue text-white hover:bg-blue/90",
    secondary: "bg-gray text-white hover:bg-gray/90",
  };

  const combined = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default Button;
