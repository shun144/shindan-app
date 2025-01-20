import { useContext, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import { tv } from "tailwind-variants";
import { DropdownContext } from "./DropdownContext";

const linkTv = tv({
  base: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out",
});

export const DropdownLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  const { setOpen } = useContext(DropdownContext);

  function handleClickClose() {
    setOpen(false);
  }

  return (
    <Link {...props} className={linkTv()} onClick={handleClickClose}>
      {children}
    </Link>
  );
};
