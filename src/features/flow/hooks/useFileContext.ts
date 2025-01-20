import { useContext } from "react";
import FileContext, { type FileContextType } from "@/features/flow/contexts/FileContext";

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
