import { PropsWithChildren } from "react";
import { DropdownProvider } from "./DropdownContext";
import { Trigger } from "./Trigger";
import { Content } from "./Content";
import { DropdownLink } from "./DropdownLink";

const Dropdown = ({ children }: PropsWithChildren) => {
  return <DropdownProvider>{children}</DropdownProvider>;
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
