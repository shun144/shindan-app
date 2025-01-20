import { Panel } from "@xyflow/react";
import { memo } from "react";
import { FlowSubmit, FlowInput, Droppable, Draggable } from "@/features/flow/components";
import { questionNodeMaxNum, resultNodeMaxNum } from "@/features/flow/constants";
import { useAppSelector } from "@/store/store";

const FlowPanel = () => {
  const qNodeNum = useAppSelector((state) => state.flow.qNodeNum);
  const rNodeNum = useAppSelector((state) => state.flow.rNodeNum);
  return (
    <>
      {/* 保存ボタン */}
      <Panel position="top-left">
        {/* ドロップ対象外エリアにするためDroppableコンポーネントで囲む */}
        <Droppable id="panel-area-0" className="flex justify-center items-center w-24 bg-transparent">
          <FlowSubmit />
        </Droppable>
      </Panel>

      {/* Title/URL */}
      <Panel position="top-right">
        <Droppable id="panel-area-1" className="w-96 py-3 bg-slate-800 rounded-md shadow flex flex-col justify-around items-center">
          <FlowInput />
        </Droppable>
      </Panel>

      {/* 質問/結果ノード */}
      <Panel position="top-left" className="panel-top-14">
        <Droppable id="panel-area-2">
          <div className="w-24 h-60 py-3 bg-slate-800 rounded-md shadow flex flex-col justify-around items-center">
            <Draggable id="draggable-question" label="質問" color="indigo" nodeNum={qNodeNum} maxNodeNum={questionNodeMaxNum} />

            <Draggable id="draggable-result" label="結果" color="orange" nodeNum={rNodeNum} maxNodeNum={resultNodeMaxNum} />
          </div>
        </Droppable>
      </Panel>
    </>
  );
};

export default memo(FlowPanel);
