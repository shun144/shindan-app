import { useContext } from "react";
import DropdownContext, {
  type DropdownContextType,
} from "@/components/dropdown/base/DropdownContext";

export const useDropdownContext = (): DropdownContextType => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("useDropdownContext must be used within a DropdownProvider");
  }
  return context;
};
