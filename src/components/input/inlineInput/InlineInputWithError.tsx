import { forwardRef, InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

const labelTv = tv({
  base: "block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 select-none",
});

const inputTv = tv({
  base: "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
});

const errorTv = tv({
  base: "text-sm text-red-600",
});

const InlineInputWithError = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label, error, register, type = "text", className = "", ...rest } = props;
  return (
    <div className="md:flex md:items-center mb-8">
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-center items-center">
          {/* ラベル */}
          <div className="md:w-1/5">
            <label className={labelTv()} htmlFor={id}>
              {label}
            </label>
          </div>

          {/* 入力フォーム */}
          <div className="md:w-4/5">
            <input
              ref={ref}
              id={id}
              {...register}
              type={type}
              className={inputTv(className)}
              {...rest}
            />
          </div>
        </div>

        {/* エラーメッセージ */}
        <div className="w-full min-h-6 flex justify-end">
          <div className="md:w-4/5">
            <p className={errorTv()}>{error}</p>
          </div>
        </div>

        {/* {error && (
          <div className="w-full flex justify-end">
            <div className="md:w-4/5">
              <p className={errorTv()}>{error}</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
});

export default InlineInputWithError;
InlineInputWithError.displayName = "InlineInputWithError";
