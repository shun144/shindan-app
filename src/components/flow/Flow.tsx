import { useCallback, useEffect, memo } from "react";
import { useAppSelector } from "@/store/store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "@/components/flow/dnd/Droppable";
import { ReactFlow, useReactFlow, Controls, Background, BackgroundVariant, ConnectionLineType, SelectionMode } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./flow.scss";
import "react-contexify/dist/ReactContexify.css";
import useNodeHook from "@/components/flow/hooks/useNodeHook";
import useEdgeHook from "@/components/flow/hooks/useEdgeHook";
import useConnectHook from "@/components/flow/hooks/useConnectHook";
import FlowPanel from "@/components/flow/panels/FlowPanel";
import { useAppDispatch } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { FlowType } from "@/types";

const Flow = (props: FlowType) => {
  const dispatch = useAppDispatch();
  // const isDirty = useAppSelector((state) => state.flow.isDirty);
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } = useNodeHook([...JSON.parse(props.questions), ...JSON.parse(props.results)]);
  const { edges, setEdges, handleEdgeClick, handleEdgeContextMenu, onEdgesChange } = useEdgeHook(JSON.parse(props.edges));
  const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } = useConnectHook(setEdges);

  useEffect(() => {
    dispatch(actions.setFlowTitle(props.title));
    dispatch(actions.setFlowUrl(props.url));
    dispatch(actions.setFirstNodeId(props.initFirstQuestionId))
  }, [props.title, props.url, dispatch]);

  //   useEffect(() => {
  //     const beforeUnloadConfirm = router.on("before", (event) => {
  //       const vist = event.detail.visit;

  //       // 保存のリクエストは現在のクエリパラメータでpost送信する
  //       // 保存を行う際に確認メッセージを出さないようにする
  //       if (vist.url.pathname === currentUrl && vist.method === "post") {
  //         return true;
  //       }

  //       // 保存されていない変更がある場合に確認メッセージを出す
  //       if (isDirty) {
  //         return confirm("変更が保存されていませんがページを離れてもよろしいですか？");
  //       }
  //       return true;
  //     });
  //     return () => beforeUnloadConfirm();
  //   }, [isDirty]);

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
    <div className="grow w-full flex">
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

// import { useCallback, useEffect, memo } from "react";
// import { useAppSelector } from "@/store/store";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import Droppable from "@/components/flow/dnd/Droppable";
// import { ReactFlow, Node, Edge, useReactFlow, Controls, Background, BackgroundVariant, ConnectionLineType, SelectionMode, type Viewport } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import "./flow.scss";
// import "react-contexify/dist/ReactContexify.css";
// import useNodeHook from "@/components/flow/hooks/useNodeHook";
// import useEdgeHook from "@/components/flow/hooks/useEdgeHook";
// import useConnectHook from "@/components/flow/hooks/useConnectHook";
// import FlowPanel from "@/components/flow/panels/FlowPanel";

// type Props = {
//   initialNodes: Node[];
//   initialEdges: Edge[];
//   defaultViewport: Viewport;
// };

// const Flow = ({ initialNodes, initialEdges, defaultViewport }: Props) => {
//   //   const { url: currentUrl } = usePage();
//   //   const isDirty = useOwnerStore((state) => state.isDirty);
//   const isDirty = useAppSelector((state) => state.flow.isDirty);

//   const { screenToFlowPosition } = useReactFlow();

//   const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } = useNodeHook(initialNodes);
//   const { edges, setEdges, handleEdgeClick, handleEdgeContextMenu, onEdgesChange } = useEdgeHook(initialEdges);
//   const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } = useConnectHook(setEdges);

//   //   useEffect(() => {
//   //     const beforeUnloadConfirm = router.on("before", (event) => {
//   //       const vist = event.detail.visit;

//   //       // 保存のリクエストは現在のクエリパラメータでpost送信する
//   //       // 保存を行う際に確認メッセージを出さないようにする
//   //       if (vist.url.pathname === currentUrl && vist.method === "post") {
//   //         return true;
//   //       }

//   //       // 保存されていない変更がある場合に確認メッセージを出す
//   //       if (isDirty) {
//   //         return confirm("変更が保存されていませんがページを離れてもよろしいですか？");
//   //       }
//   //       return true;
//   //     });
//   //     return () => beforeUnloadConfirm();
//   //   }, [isDirty]);

//   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
//     // フロー作成エリア以外にドロップしたら何もしない
//     if (over == null || over.id != "droppableArea") return;

//     // activatorEventがMouseEventの場合に処理を進める
//     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//     if (activatorEvent instanceof MouseEvent) {
//       const absoluteX = activatorEvent.pageX + delta.x;
//       const absoluteY = activatorEvent.pageY + delta.y;

//       // デフォルトだとノードが作成される位置が、
//       // ドロップした位置のやや右下になるため微調整
//       const offset = {
//         x: 30,
//         y: 20,
//       };

//       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//       const position = screenToFlowPosition({
//         x: absoluteX - offset.x,
//         y: absoluteY - offset.y,
//       });

//       switch (active.id) {
//         case "draggable-question":
//           onAddQuestion(position);
//           break;
//         case "draggable-result":
//           onAddResult(position);
//           break;
//         default:
//           break;
//       }
//     }
//   }, []);

//   return (
//     <div className="grow w-full flex">
//       <DndContext onDragEnd={handleDragEnd}>
//         <Droppable id="droppableArea">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             snapToGrid
//             connectionLineType={ConnectionLineType.SmoothStep}
//             onReconnect={onReconnect}
//             onReconnectStart={onReconnectStart}
//             onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
//             onConnect={onConnect}
//             onEdgeClick={handleEdgeClick}
//             onEdgeContextMenu={handleEdgeContextMenu}
//             elevateEdgesOnSelect={true}
//             defaultViewport={defaultViewport}
//             panOnScroll
//             elementsSelectable
//             selectionMode={SelectionMode.Partial}
//           >
//             <Background color="#222" variant={BackgroundVariant.Lines} gap={20} />

//             <FlowPanel />
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </DndContext>
//     </div>
//   );
// };

// export default memo(Flow);

// import { useCallback, useEffect, memo } from "react";
// import { useAppSelector } from "@/store/store";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import Droppable from "@/components/flow/dnd/Droppable";
// import { ReactFlow, Node, Edge, useReactFlow, Controls, Background, BackgroundVariant, ConnectionLineType, SelectionMode, type Viewport } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import "./flow.scss";
// import "react-contexify/dist/ReactContexify.css";
// import useNodeHook from "@/components/flow/hooks/useNodeHook";
// import useEdgeHook from "@/components/flow/hooks/useEdgeHook";
// import useConnectHook from "@/components/flow/hooks/useConnectHook";
// import FlowPanel from "@/components/flow/panels/FlowPanel";
// import { useAppDispatch } from "@/store/store";
// import { actions } from "@/store/slice/flowSlice";

// type Props = {
//   title: string;
//   url: string;
//   initFirstQuestionId?: string;
//   initialNodes: Node[];
//   initialEdges: Edge[];
//   initialViewport: Viewport;
// };

// const Flow = ({ initialNodes, initialEdges, initialViewport, title, url }: Props) => {
//   const dispatch = useAppDispatch();
//   const isDirty = useAppSelector((state) => state.flow.isDirty);
//   const { screenToFlowPosition } = useReactFlow();

//   const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } = useNodeHook(initialNodes);
//   const { edges, setEdges, handleEdgeClick, handleEdgeContextMenu, onEdgesChange } = useEdgeHook(initialEdges);
//   const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } = useConnectHook(setEdges);

//   useEffect(() => {
//     dispatch(actions.setFlowTitle(title));
//     dispatch(actions.setFlowUrl(url));
//   }, [title, url, dispatch]);

//   //   useEffect(() => {
//   //     const beforeUnloadConfirm = router.on("before", (event) => {
//   //       const vist = event.detail.visit;

//   //       // 保存のリクエストは現在のクエリパラメータでpost送信する
//   //       // 保存を行う際に確認メッセージを出さないようにする
//   //       if (vist.url.pathname === currentUrl && vist.method === "post") {
//   //         return true;
//   //       }

//   //       // 保存されていない変更がある場合に確認メッセージを出す
//   //       if (isDirty) {
//   //         return confirm("変更が保存されていませんがページを離れてもよろしいですか？");
//   //       }
//   //       return true;
//   //     });
//   //     return () => beforeUnloadConfirm();
//   //   }, [isDirty]);

//   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
//     // フロー作成エリア以外にドロップしたら何もしない
//     if (over == null || over.id != "droppableArea") return;

//     // activatorEventがMouseEventの場合に処理を進める
//     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//     if (activatorEvent instanceof MouseEvent) {
//       const absoluteX = activatorEvent.pageX + delta.x;
//       const absoluteY = activatorEvent.pageY + delta.y;

//       // デフォルトだとノードが作成される位置が、
//       // ドロップした位置のやや右下になるため微調整
//       const offset = {
//         x: 30,
//         y: 20,
//       };

//       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//       const position = screenToFlowPosition({
//         x: absoluteX - offset.x,
//         y: absoluteY - offset.y,
//       });

//       switch (active.id) {
//         case "draggable-question":
//           onAddQuestion(position);
//           break;
//         case "draggable-result":
//           onAddResult(position);
//           break;
//         default:
//           break;
//       }
//     }
//   }, []);

//   return (
//     <div className="grow w-full flex">
//       <DndContext onDragEnd={handleDragEnd}>
//         <Droppable id="droppableArea">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             snapToGrid
//             connectionLineType={ConnectionLineType.SmoothStep}
//             onReconnect={onReconnect}
//             onReconnectStart={onReconnectStart}
//             onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
//             onConnect={onConnect}
//             onEdgeClick={handleEdgeClick}
//             onEdgeContextMenu={handleEdgeContextMenu}
//             elevateEdgesOnSelect={true}
//             defaultViewport={initialViewport}
//             panOnScroll
//             elementsSelectable
//             selectionMode={SelectionMode.Partial}
//           >
//             <Background color="#222" variant={BackgroundVariant.Lines} gap={20} />

//             <FlowPanel />
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </DndContext>
//     </div>
//   );
// };

// export default memo(Flow);

// // import { useCallback, useEffect, memo } from "react";
// // import { useAppSelector } from "@/store/store";
// // import { DndContext, DragEndEvent } from "@dnd-kit/core";
// // import Droppable from "@/components/flow/dnd/Droppable";
// // import { ReactFlow, Node, Edge, useReactFlow, Controls, Background, BackgroundVariant, ConnectionLineType, SelectionMode, type Viewport } from "@xyflow/react";
// // import "@xyflow/react/dist/style.css";
// // import "./flow.scss";
// // import "react-contexify/dist/ReactContexify.css";
// // import useNodeHook from "@/components/flow/hooks/useNodeHook";
// // import useEdgeHook from "@/components/flow/hooks/useEdgeHook";
// // import useConnectHook from "@/components/flow/hooks/useConnectHook";
// // import FlowPanel from "@/components/flow/panels/FlowPanel";

// // type Props = {
// //   initialNodes: Node[];
// //   initialEdges: Edge[];
// //   defaultViewport: Viewport;
// // };

// // const Flow = ({ initialNodes, initialEdges, defaultViewport }: Props) => {
// //   //   const { url: currentUrl } = usePage();
// //   //   const isDirty = useOwnerStore((state) => state.isDirty);
// //   const isDirty = useAppSelector((state) => state.flow.isDirty);

// //   const { screenToFlowPosition } = useReactFlow();

// //   const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } = useNodeHook(initialNodes);
// //   const { edges, setEdges, handleEdgeClick, handleEdgeContextMenu, onEdgesChange } = useEdgeHook(initialEdges);
// //   const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } = useConnectHook(setEdges);

// //   //   useEffect(() => {
// //   //     const beforeUnloadConfirm = router.on("before", (event) => {
// //   //       const vist = event.detail.visit;

// //   //       // 保存のリクエストは現在のクエリパラメータでpost送信する
// //   //       // 保存を行う際に確認メッセージを出さないようにする
// //   //       if (vist.url.pathname === currentUrl && vist.method === "post") {
// //   //         return true;
// //   //       }

// //   //       // 保存されていない変更がある場合に確認メッセージを出す
// //   //       if (isDirty) {
// //   //         return confirm("変更が保存されていませんがページを離れてもよろしいですか？");
// //   //       }
// //   //       return true;
// //   //     });
// //   //     return () => beforeUnloadConfirm();
// //   //   }, [isDirty]);

// //   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
// //     // フロー作成エリア以外にドロップしたら何もしない
// //     if (over == null || over.id != "droppableArea") return;

// //     // activatorEventがMouseEventの場合に処理を進める
// //     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
// //     if (activatorEvent instanceof MouseEvent) {
// //       const absoluteX = activatorEvent.pageX + delta.x;
// //       const absoluteY = activatorEvent.pageY + delta.y;

// //       // デフォルトだとノードが作成される位置が、
// //       // ドロップした位置のやや右下になるため微調整
// //       const offset = {
// //         x: 30,
// //         y: 20,
// //       };

// //       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
// //       const position = screenToFlowPosition({
// //         x: absoluteX - offset.x,
// //         y: absoluteY - offset.y,
// //       });

// //       switch (active.id) {
// //         case "draggable-question":
// //           onAddQuestion(position);
// //           break;
// //         case "draggable-result":
// //           onAddResult(position);
// //           break;
// //         default:
// //           break;
// //       }
// //     }
// //   }, []);

// //   return (
// //     <div className="grow w-full flex">
// //       <DndContext onDragEnd={handleDragEnd}>
// //         <Droppable id="droppableArea">
// //           <ReactFlow
// //             nodes={nodes}
// //             edges={edges}
// //             nodeTypes={nodeTypes}
// //             onNodesChange={onNodesChange}
// //             onEdgesChange={onEdgesChange}
// //             snapToGrid
// //             connectionLineType={ConnectionLineType.SmoothStep}
// //             onReconnect={onReconnect}
// //             onReconnectStart={onReconnectStart}
// //             onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
// //             onConnect={onConnect}
// //             onEdgeClick={handleEdgeClick}
// //             onEdgeContextMenu={handleEdgeContextMenu}
// //             elevateEdgesOnSelect={true}
// //             defaultViewport={defaultViewport}
// //             panOnScroll
// //             elementsSelectable
// //             selectionMode={SelectionMode.Partial}
// //           >
// //             <Background color="#222" variant={BackgroundVariant.Lines} gap={20} />

// //             <FlowPanel />
// //             <Controls />
// //           </ReactFlow>
// //         </Droppable>
// //       </DndContext>
// //     </div>
// //   );
// // };

// // export default memo(Flow);
