import { createContext, PropsWithChildren, useState, useContext } from "react";

export interface CommitPendingContextType {
  isCommitPending: boolean;
  setIsCommitPending: (isPending: boolean) => void;
}

const CommitPendingContext = createContext<CommitPendingContextType | null>(null);

/**
 * 保存処理中（isPending=true）であることを検知するためのProvider
 * @param param0
 * @returns
 */
export const CommitPendingProvider = ({ children }: PropsWithChildren) => {
  const [isCommitPending, setIsCommitPending] = useState(false);

  return (
    <CommitPendingContext.Provider value={{ isCommitPending, setIsCommitPending }}>
      {children}
    </CommitPendingContext.Provider>
  );
};

export const useCommitPendingContext = (): CommitPendingContextType => {
  const context = useContext(CommitPendingContext);
  if (!context) {
    throw new Error("useCommitPendingContext must be used within a CommitPendingProvider");
  }
  return context;
};
