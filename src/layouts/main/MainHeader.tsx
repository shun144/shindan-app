import { memo } from "react";
import { Link } from "react-router-dom";
import { ProfileDropdown } from "@/components";

const MainHeader = () => {
  return (
    <header className="w-full h-12 flex justify-center border-b border-slate-300">
      <div className="w-8/12 h-full flex justify-between items-center">
        <Link
          to={"/"}
          className="text-3xl font-black inline-block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent"
        >
          SHINDAN-APP
        </Link>
        {/* プロフィールボタントグル */}
        <div className="sm:flex hidden sm:items-center sm:ms-6">
          <div className="relative me-5">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(MainHeader);
