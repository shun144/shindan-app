import { useContext } from "react";
import CommitPendingContext, {
  type CommitPendingContextType,
} from "@/features/flow/contexts/CommitPendingContext";

export const useCommitPendingContext = (): CommitPendingContextType => {
  const context = useContext(CommitPendingContext);
  if (!context) {
    throw new Error("useCommitPendingContext must be used within a CommitPendingProvider");
  }
  return context;
};
