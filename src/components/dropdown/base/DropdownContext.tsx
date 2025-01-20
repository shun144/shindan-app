import { createContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";

interface ContextType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}

const initValue = {
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
};

export const DropdownContext = createContext<ContextType>(initValue);

export const DropdownProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};
