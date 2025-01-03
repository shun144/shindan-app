import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import { tv } from "tailwind-variants";


type Props = InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }

const inputTv = tv({
    base: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
});

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }: Props, ref
) {
    const localRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({ focus: () => localRef.current?.focus() }));

    useEffect(() => {
        if (isFocused) localRef.current?.focus()
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={inputTv({ className })}
            ref={localRef}
        />
    );
});
