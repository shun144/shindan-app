import { memo } from "react";
import { Outlet } from "react-router-dom";

const FlowLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default memo(FlowLayout);
