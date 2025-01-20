import { useContext, PropsWithChildren } from "react";
import { DropdownContext } from "./DropdownContext";

export const Trigger = ({ children }: PropsWithChildren) => {
  const { open, setOpen, toggleOpen } = useContext(DropdownContext);

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
