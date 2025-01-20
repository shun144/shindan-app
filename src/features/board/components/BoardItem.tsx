import { memo } from "react";
import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useContextMenu } from "react-contexify";
import { type BoardItemType } from "@/features/board/types";
import { BoardMenu } from "@/features/board/components";

type Props = {
  boardItem: BoardItemType;
  handleOpenEditModal: (boardItem: BoardItemType) => void;
};

const linkTv = tv({
  base: "w-56 h-40 rounded-md border shadow block bg-white overflow-hidden select-none focus:outline-none focus:none hover:opacity-70 transition duration-150",
});

const BoardItem = ({ boardItem, handleOpenEditModal }: Props) => {
  const { flowId, title } = boardItem;
  const menuId = `BOARD-MENU-${flowId}`;

  const { show } = useContextMenu({ id: menuId });
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    show({ event, props: { boardItem } });
  };

  return (
    <>
      <Link
        to={`flow/${flowId}`}
        className={linkTv()}
        onContextMenu={handleContextMenu}
        type="button"
      >
        <div className="w-full h-full flex flex-col">
          <div className="h-3/12 min-h-8 w-full bg-indigo-400 flex justify-start items-center overflow-auto">
            <div className="px-2">
              <div className="max-w-full max-h-full text-white">{title}</div>
            </div>
          </div>
          <div className="h-9/12 w-full overflow-hidden">
            <img
              src="https://picsum.photos/300/200?blur"
              alt="ランダム画像"
              className="object-cover"
            />
          </div>
        </div>
      </Link>

      <BoardMenu menuId={menuId} boardItem={boardItem} handleOpenEditModal={handleOpenEditModal} />
    </>
  );
};

export default memo(BoardItem);
