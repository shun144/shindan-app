import { memo, useEffect, useState } from "react";
import { type FlowType } from "@/types";
import { initialFlows } from "@/utils/db";
import { createFlow, updateFlow, fetchFlows } from "@/db/utils";
import { MyToaster } from "@/parts/toast/MyToaster";
import CreateModal from "@/parts/modal/CreateModal";
import BoardItem from "./BoardItem";
import BoardMenu from "./BoardMenu";

import "react-contexify/dist/ReactContexify.css";

const MainBoard = () => {
  const [flows, setFlows] = useState<FlowType[]>([]);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  useEffect(() => {
    // createFlow("1");

    const userId = "1";
    const flowId = "1rqDFWxdbKYdDeJKeXe2";
    const flowData = {
      x: 100,
      y: 200,
    };

    // updateFlow(userId, flowId, flowData);
    fetchFlows();
    setFlows(initialFlows);
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-start ">
        <div className="w-full h-full flex justify-center items-center">
          <div className="grow h-full flex justify-center items-center ">
            <div className="w-11/12 h-full ">
              {flows.length ? (
                <div className="grid grid-cols-5 gap-8 pt-20">
                  {flows.map(({ id, title, url }) => (
                    <BoardItem key={id} id={id} title={title} fullUrl={`${url}`} />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-start">
                  <div className="text-3xl font-bold select-none text-slate-400/80">作成ボタンからアンケートを作成してください</div>
                </div>
              )}
            </div>
          </div>
          <div className="w-2/12 h-full ">
            <div className="flex justify-start items-center pt-10">
              <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow-lg transition-all hover:bg-indigo-600 duration-300" onClick={() => setIsOpenCreateModal(true)}>
                新 規 作 成
              </button>
            </div>
          </div>
        </div>
      </div>

      <MyToaster />

      <CreateModal isOpenModal={isOpenCreateModal} setIsOpenModal={setIsOpenCreateModal} />

      <BoardMenu setFlows={setFlows} />
    </>
  );
};

export default memo(MainBoard);
