import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  className: string;
  placeholder: string;
};

const DebouncedInput = ({ onChange, debounce = 500, ...props }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return <input {...props} value={value} onChange={(e) => setValue(e.currentTarget.value)} />;
};

export default DebouncedInput;
