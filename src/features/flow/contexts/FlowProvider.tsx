import { PropsWithChildren } from "react";
import { FileProvider, CommitPendingProvider } from "@/features/flow/contexts";

const FlowProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <FileProvider>
        <CommitPendingProvider>{children}</CommitPendingProvider>
      </FileProvider>
    </>
  );
};

export default FlowProvider;
