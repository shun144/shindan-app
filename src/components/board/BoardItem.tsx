import { memo } from "react";
import { displayMenu } from "./BoardMenu";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";

type Props = {
  id: string;
  title: string;
  fullUrl: string;
};

const linkTv = tv({
  base: "w-56 h-40 rounded-md border shadow block bg-white overflow-hidden select-none focus:outline-none focus:none hover:opacity-70 transition duration-150"
});


const BoardItem = ({ id, title, fullUrl }: Props) => {
  return (
    <Link
      to={`flow/${id}`}
      className={linkTv()}
      onContextMenu={(event) => displayMenu(event, id, title, fullUrl)} type="button"
    >
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="h-4/12 w-full bg-indigo-400 flex justify-start items-center overflow-auto">
          <div className="px-2">
            <div className="max-w-full max-h-full text-white">{title}</div>
          </div>
        </div>
        <div className="grow w-full px-2">{title}</div>

        <div className="h-2/12 w-full bg-indigo-400 flex justify-start items-center overflow-auto">
          <div className="px-2">
            <div className="max-w-full max-h-full text-indigo-100 text-sm">{fullUrl}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(BoardItem);
