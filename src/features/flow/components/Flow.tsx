import { useCallback, useEffect, memo } from "react";
import { useAppSelector } from "@/store/store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  ReactFlow,
  useReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  SelectionMode,
} from "@xyflow/react";
import { useNodeHook, useEdgeHook, useConnectHook } from "@/features/flow/hooks";
import { FlowPanel, Droppable } from "@/features/flow/components";
import { useAppDispatch } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { FlowType } from "@/types";
import { unstable_usePrompt, useBeforeUnload } from "react-router-dom";
import { useCommitPendingContext } from "@/features/flow/contexts";

const Flow = (props: FlowType) => {
  const dispatch = useAppDispatch();
  const isDirty = useAppSelector((state) => state.flow.isDirty);
  const { screenToFlowPosition } = useReactFlow();
  const { isCommitPending } = useCommitPendingContext();

  const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } = useNodeHook([
    ...JSON.parse(props.questions),
    ...JSON.parse(props.results),
  ]);
  const { edges, setEdges, handleEdgeClick, handleEdgeContextMenu, onEdgesChange } = useEdgeHook(
    JSON.parse(props.edges)
  );
  const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } = useConnectHook(setEdges);

  useEffect(() => {
    // サーバから取得した値をグローバルステートにセット
    dispatch(actions.setFlowTitle(props.title));
    dispatch(actions.setFlowUrl(props.url));
    dispatch(actions.setFirstNodeId(props.initFirstQuestionId));
  }, [props.title, props.url, props.initFirstQuestionId, dispatch]);

  // ページリロード時の確認ダイアログ
  // beforeunloadは標準ダイアログしかだせない
  useBeforeUnload(
    useCallback(
      (event) => {
        if (!isDirty) return;
        event.preventDefault();
      },
      [isDirty]
    )
  );

  // 別SPAページに遷移する際の確認ダイアログ
  unstable_usePrompt({
    message: "変更が保存されていませんがページを離れてもよろしいですか？",
    when: ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  });

  const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
    // フロー作成エリア以外にドロップしたら何もしない
    if (over == null || over.id != "droppableArea") return;

    // activatorEventがMouseEventの場合に処理を進める
    // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
    if (activatorEvent instanceof MouseEvent) {
      const absoluteX = activatorEvent.pageX + delta.x;
      const absoluteY = activatorEvent.pageY + delta.y;

      // デフォルトだとノードが作成される位置が、
      // ドロップした位置のやや右下になるため微調整
      const offset = {
        x: 30,
        y: 20,
      };

      // ブラウザ上の絶対座標をreactFlow上の座標に変換する
      const position = screenToFlowPosition({
        x: absoluteX - offset.x,
        y: absoluteY - offset.y,
      });

      switch (active.id) {
        case "draggable-question":
          onAddQuestion(position);
          break;
        case "draggable-result":
          onAddResult(position);
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <div className="grow w-full flex relative">
      {isCommitPending && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          test
        </div>
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <Droppable id="droppableArea">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            snapToGrid
            connectionLineType={ConnectionLineType.SmoothStep}
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
            onConnect={onConnect}
            onEdgeClick={handleEdgeClick}
            onEdgeContextMenu={handleEdgeContextMenu}
            elevateEdgesOnSelect={true}
            defaultViewport={{ x: props.x, y: props.y, zoom: props.zoom }}
            panOnScroll
            elementsSelectable
            selectionMode={SelectionMode.Partial}
          >
            <Background color="#222" variant={BackgroundVariant.Lines} gap={20} />

            <FlowPanel />
            <Controls />
          </ReactFlow>
        </Droppable>
      </DndContext>
    </div>
  );
};

export default memo(Flow);
