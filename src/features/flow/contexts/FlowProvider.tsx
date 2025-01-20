import { PropsWithChildren } from "react";
import { FileProvider } from "./FileContext";
import { CommitPendingProvider } from "./CommitPendingContext";

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
