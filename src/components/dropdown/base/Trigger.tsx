import { PropsWithChildren } from "react";
import { useDropdownContext } from "@/hooks/useDropdownContext";

export const Trigger = ({ children }: PropsWithChildren) => {
  const { open, setOpen, toggleOpen } = useDropdownContext();

  function handleClickClose() {
    setOpen(false);
  }

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>
      {open && <div className="fixed inset-0 z-40" onClick={handleClickClose} />}
    </>
  );
};
