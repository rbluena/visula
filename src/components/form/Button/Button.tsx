import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonStyle = cva(
  "flex items-center justify-center px-4 py-2 rounded font-medium hover:opacity-80 focus:outline-none",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        danger: "bg-red-500 text-white border border-red-500",
        monochrome: "bg-black text-white",
      },
      modifier: {
        default: "",
        outline: "bg-transparent",
        text: "shadow-none border-none bg-transparent hover:text-underline",
        icon: "p-1.5",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        sm: "text-xs p-1",
        md: "text-sm px-3 py-2",
        lg: "text-base py-4 px-2",
        xl: "text-lg px-6 py-3",
      },
      disabled: {
        true: "bg-slate-100 text-slate-400 border-slate-200",
      },
    },
    compoundVariants: [
      // Primary button
      {
        modifier: "icon",
        size: "md",
        className: "p-1.5",
      },
      {
        variant: "primary",
        modifier: "default",
        className: "bg-indigo-500 border border-indigo-600 text-white",
      },
      {
        variant: "primary",
        modifier: "outline",
        className: "bg-transparent border border-indigo-400 text-indigo-600",
      },
      {
        variant: "primary",
        modifier: "text",
        className: "text-indigo-600 bg-transparent",
      },
      {
        variant: "primary",
        modifier: "icon",
        className: "text-indigo-700 bg-indigo-50 border border-indigo-400",
      },

      // Monochrome button
      {
        variant: "monochrome",
        modifier: "outline",
        className: "text-slate-900 border border-slate-900",
      },
      {
        variant: "monochrome",
        modifier: "text",
        className: "text-slate-900",
      },
    ],
    defaultVariants: {
      variant: "default",
      modifier: "default",
      size: "md",
      fullWidth: false,
      rounded: false,
      disabled: false,
    },
  }
);

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonStyle> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const Button = forwardRef<any, Props>(
  (
    {
      children,
      href,
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      rounded,
      className = "",
      ...props
    },
    forwardRef
  ) => {
    if (href?.length) {
      return (
        <Link
          href={href}
          className={buttonStyle({
            variant,
            modifier,
            size,
            rounded,
            fullWidth,
            disabled,
          })}
          ref={forwardRef}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        disabled={disabled || false}
        className={`${buttonStyle({
          variant,
          modifier,
          size,
          rounded,
          fullWidth,
          disabled,
        })} ${className}`}
        ref={forwardRef}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
