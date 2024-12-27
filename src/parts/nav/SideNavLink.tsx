import { memo } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { tv } from "tailwind-variants";
import { IconType } from "react-icons";

const linkTv = tv({
  base: "flex justify-start items-center w-full min-w-20 min-h-20 overflow-hidden border-b border-slate-300 group transition duration-300",
  variants: {
    active: {
      true: "bg-indigo-500",
      false: "bg-transparent hover:bg-slate-200",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const spanTv = tv({
  base: "text-base font-medium leading-5  ease-in-out focus:outline-none whitespace-nowrap transition duration-300",
  variants: {
    active: {
      true: "text-white",
      false: "text-indigo-600 group-hover:text-indigo-400",
    },
  },
  defaultVariants: {
    active: false,
  },
});

type Props = NavLinkProps & { icon?: IconType; children: React.ReactNode };

const SideNavLink = ({ children, icon: Icon, ...props }: Props) => {
  return (
    <NavLink {...props} className={({ isActive }) => linkTv({ active: isActive })}>
      {({ isActive }) => (
        <div className="flex justify-center items-center gap-3 pl-2">
          {Icon && <Icon size={40} className="bg-indigo-100 text-indigo-700 p-2 rounded-full shrink-0" />}
          <span className={spanTv({ active: isActive })}>{children}</span>
        </div>
      )}
    </NavLink>
  );
};

export default memo(SideNavLink);
