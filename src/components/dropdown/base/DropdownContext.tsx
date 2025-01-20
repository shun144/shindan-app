import { createContext, Dispatch, SetStateAction, useState, PropsWithChildren } from "react";

export type DropdownContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
};

const initValue = {
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
};

const DropdownContext = createContext<DropdownContextType>(initValue);

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

export default DropdownContext;

// export const useDropdownContext = (): ContextType => {
//   const context = useContext(DropdownContext);

//   if (!context) {
//     throw new Error("useDropdownContext must be used within a DropdownProvider");
//   }
//   return context;
// };
