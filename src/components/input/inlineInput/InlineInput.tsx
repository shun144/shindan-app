import { forwardRef, InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const labelTv = tv({
  base: "block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 select-none",
});

const inputTv = tv({
  base: "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
});

const InlineInput = forwardRef<HTMLInputElement, Props>(
  ({ id, label, type = "text", className = "", ...props }: Props, ref) => {
    return (
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label className={labelTv()} htmlFor={id}>
            {label}
          </label>
        </div>
        <div className="md:w-3/4">
          <input id={id} ref={ref} type={type} className={inputTv(className)} {...props} />
        </div>
      </div>
    );
  }
);

export default InlineInput;
InlineInput.displayName = "InlineInput";
