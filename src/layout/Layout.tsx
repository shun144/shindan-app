import { ReactNode, memo } from "react";
import ProfileDropdown from "@/parts/dropdown/ProfileDropdown";
import HamburgerToggle from "@/parts/toggle/HamburgerToggle";
import { motion } from "framer-motion";
import { TbNotebook } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions as layoutActions } from "@/store/slice/layoutSlice";
import { Outlet, Link } from "react-router-dom";
import SideNavLink from "@/parts/nav/SideNavLink";

const links = [
  {
    path: "/",
    display: "アンケート",
    icon: TbNotebook,
  },
  {
    path: "totalling",
    display: "集計",
    icon: MdOutlineSummarize,
  },
];

const sidebarVariants = {
  open: (width: string) => ({
    width,
  }),
  closed: { width: "0%" },
};

type Props = {
  header?: ReactNode;
};

const Layout = ({ header }: Props) => {
  const isSidebarOpen = useAppSelector((state) => state.layout.isSidebarOpen);
  const dispatch = useAppDispatch();

  const toggleClickHandle = () => {
    dispatch(layoutActions.setIsSidebarOpen(!isSidebarOpen));
  };

  return (
    <div className="w-full min-h-screen h-screen">
      <div className="w-full h-full flex">
        <motion.div className="sidebar h-full overflow-hidden bg-stone-100 boder border-r-2 border-slate-200 shadow-xl" variants={sidebarVariants} initial={false} animate={isSidebarOpen ? "open" : "closed"} custom={"10rem"} transition={{ type: "tween", duration: 0.4 }}>
          <div className="flex flex-col justify-start items-start">
            <div className="w-full flex justify-center items-center h-14 border-b-2">
              <Link to="/">{/* <ApplicationLogo className="block h-9 fill-current text-indigo-800" /> */}</Link>
            </div>

            {links.map(({ path, display, icon }) => (
              <SideNavLink key={path} to={path} icon={icon}>
                {display}
              </SideNavLink>
            ))}

            {/* {links.map(({ name, display, icon }) => (
              <NavLink key={name} href={route(name)} active={route().current(name)} icon={icon}>
                {display}
              </NavLink>
            ))} */}
          </div>
        </motion.div>
        <div className="grow h-full flex flex-col">
          <div className="w-full h-14 border-b border-slate-200 shadow">
            <div className="h-full flex justify-between items-center">
              <div className="ms-1 group">
                <button className="h-10 px-4 flex justify-center items-center" onClick={toggleClickHandle}>
                  <HamburgerToggle isOpen={isSidebarOpen} className="w-4 h-3" />
                </button>
              </div>

              {/* {header} */}

              <div className="sm:flex hidden sm:items-center sm:ms-6 ">
                <div className="relative me-5">
                  <ProfileDropdown />
                </div>
              </div>
            </div>
          </div>

          <main className="grow overflow-y-scroll">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default memo(Layout);
