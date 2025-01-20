import { useContext, PropsWithChildren } from "react";
import { Transition } from "@headlessui/react";
import { DropdownContext } from "./DropdownContext";

type Props = PropsWithChildren<{
  align?: "left" | "right";
  width?: "48";
  contentClasses?: string;
}>;

export const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  children,
}: Props) => {
  const { open, setOpen } = useContext(DropdownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  return (
    <Transition
      show={open}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
        onClick={() => setOpen(false)}
      >
        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
          {children}
        </div>
      </div>
    </Transition>
  );
};
