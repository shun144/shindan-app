import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonTv = tv({
  base: "py-2 px-3 rounded shadow cursor-pointer transition-all",
  variants: {
    variant: {
      primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
      secondary: "bg-gray-100 text-gray-800",
      cancel: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    },
    disabled: {
      true: "bg-gray-400 cursor-not-allowed shadow-none",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    disabled: false,
  },
});

type ButtonProps = VariantProps<typeof buttonTv>;

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  buttonProps?: ButtonProps;
}

const Button = ({
  type = "button",
  children,
  buttonProps = { variant: "primary" },
  className = "",
  ...props
}: Props) => {
  return (
    <button type={type} className={`${buttonTv(buttonProps)} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
