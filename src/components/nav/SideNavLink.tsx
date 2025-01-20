import { memo } from "react";
import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";
import { TbNotebook } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";

const links = [
  {
    path: "/",
    display: "ホーム",
    icon: TbNotebook,
  },
  {
    path: "total",
    display: "集計",
    icon: MdOutlineSummarize,
  },
];

const linkTv = tv({
  base: "flex justify-start items-center w-full min-w-20 py-2 overflow-hidden group transition duration-300 rounded-md",
  variants: {
    active: {
      true: "bg-gray-400/40",
      false: "bg-transparent hover:bg-gray-200",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const spanTv = tv({
  base: "text-base font-medium leading-5 ease-in-out focus:outline-none whitespace-nowrap transition duration-300",
  variants: {
    active: {
      true: "text-gray-800",
      false: "text-gray-600",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const SideNavLink = () => {
  return (
    <div className="w-full h-full overflow-hidden border border-slate-300 pt-5">
      <div className="flex flex-col justify-start items-start">
        <div className="w-11/12 mx-auto">
          {links.map(({ path, display, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => linkTv({ active: isActive })}
            >
              {({ isActive }) => (
                <div className="flex justify-center items-center gap-3 pl-2">
                  {Icon && <Icon size={40} className=" text-slate-600 p-2 rounded-full shrink-0" />}
                  <span className={spanTv({ active: isActive })}>{display}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(SideNavLink);

// import { memo } from "react";
// import { NavLink, NavLinkProps } from "react-router-dom";
// import { tv } from "tailwind-variants";
// import { IconType } from "react-icons";

// const linkTv = tv({
//   base: "flex justify-start items-center w-full min-w-20 min-h-20 overflow-hidden group transition duration-300",
//   variants: {
//     active: {
//       true: "bg-indigo-500",
//       false: "bg-transparent hover:bg-slate-200",
//     },
//   },
//   defaultVariants: {
//     active: false,
//   },
// });

// const spanTv = tv({
//   base: "text-base font-medium leading-5 ease-in-out focus:outline-none whitespace-nowrap transition duration-300",
//   variants: {
//     active: {
//       true: "text-white",
//       false: "text-indigo-600 group-hover:text-indigo-400",
//     },
//   },
//   defaultVariants: {
//     active: false,
//   },
// });

// type Props = NavLinkProps & { icon?: IconType; children: React.ReactNode };

// const SideNavLink = ({ children, icon: Icon, ...props }: Props) => {
//   return (
//     <NavLink {...props} className={({ isActive }) => linkTv({ active: isActive })}>
//       {({ isActive }) => (
//         <div className="flex justify-center items-center gap-3 pl-2">
//           {Icon && (
//             <Icon size={40} className="bg-indigo-100 text-indigo-700 p-2 rounded-full shrink-0" />
//           )}
//           <span className={spanTv({ active: isActive })}>{children}</span>
//         </div>
//       )}
//     </NavLink>
//   );
// };

// export default memo(SideNavLink);
