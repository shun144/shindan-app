import { memo, useState } from "react";
import { type FlowType } from "@/types";
import { fetchFlows } from "@/db/functions/flow";
import { MyToaster } from "@/components";
import { BoardItem, CreateModal, EditModal, BoardSkeleton } from "@/features/board/components";
import { useAppSelector } from "@/store/store";
import { useQuery, UseQueryResult, QueryFunctionContext } from "@tanstack/react-query";
import "react-contexify/dist/ReactContexify.css";
import { type BoardItemType } from "@/features/board/types";

const fetchFunc = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [, userId] = queryKey;
  const res = await fetchFlows(userId);
  return res;
};

const noSelectedBoardItem = {
  flowId: "noSelected",
  title: "noSelected",
  url: "noSelected",
};

const Board = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const userId = useAppSelector((state) => state.user.userId);

  const { data: flows, isPending }: UseQueryResult<FlowType[] | undefined> = useQuery({
    queryKey: ["flows", userId],
    queryFn: fetchFunc,
  });

  function handleOpenCreateModal() {
    setIsOpenCreateModal(true);
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBoardItem, setSelectedBoardItem] = useState<BoardItemType>(noSelectedBoardItem);

  const openEditModal = (boardItem: BoardItemType) => {
    setSelectedBoardItem(boardItem);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedBoardItem(noSelectedBoardItem);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-start">
        <div className="w-11/12 h-full flex flex-col justify-center items-center">
          {/* ボタンヘッダー */}
          <div className="w-full h-24 bg-slate-200/60 flex justify-start items-center">
            <button
              className="bg-indigo-500 py-2 px-3 ml-4 text-white rounded shadow transition-all hover:bg-indigo-600 duration-300"
              onClick={handleOpenCreateModal}
            >
              新 規 作 成
            </button>
          </div>

          {/* アンケート一覧 */}
          <div className="w-full max-w-screen-lg grow flex justify-center items-center">
            <div className="w-full h-full">
              {/* ロード中 */}
              {isPending ? (
                <div className="grid grid-cols-4 gap-8 pt-10">
                  <BoardSkeleton />
                </div>
              ) : flows?.length === 0 ? (
                // アンケートが無い場合
                <div className="w-full h-full flex justify-center items-start">
                  <div className="text-3xl font-bold select-none text-slate-400/80">
                    作成ボタンからアンケートを作成してください
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-8 pt-10">
                  {flows?.map(({ id, title, url }) => (
                    <BoardItem
                      key={id}
                      boardItem={{
                        flowId: id,
                        title,
                        url,
                      }}
                      handleOpenEditModal={openEditModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MyToaster />

      <CreateModal isOpenModal={isOpenCreateModal} setIsOpenModal={setIsOpenCreateModal} />

      <EditModal
        isOpenModal={isModalOpen}
        closeModal={closeEditModal}
        boardItem={selectedBoardItem}
      />
    </>
  );
};

export default memo(Board);
