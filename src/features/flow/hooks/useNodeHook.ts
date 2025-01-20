import { useCallback, useEffect, useMemo, useState } from "react";
import { Node, OnNodesChange, applyNodeChanges, useReactFlow } from "@xyflow/react";
import { useAppDispatch } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { getNewId } from "@/utils/flowUtils";
import { QuestionNode, ResultNode } from "@/features/flow/components";

const useNodeHook = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const { addNodes, getNodes } = useReactFlow();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actions.setQnodeNum(initialNodes.filter((x) => x.type === "qNode").length));
    dispatch(actions.setRnodeNum(initialNodes.filter((x) => x.type === "rNode").length));
  }, []);

  const nodeTypes = useMemo(
    () => ({
      qNode: QuestionNode,
      rNode: ResultNode,
    }),
    []
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      dispatch(actions.setIsDirty(true));
    },
    [setNodes]
  );

  // 質問ノード追加
  const onAddQuestion = (position: { x: number; y: number }) => {
    const newQuestionNo = getNewId();
    const newChoiceNo = getNewId();

    // 既存の質問ノードが0個の場合、追加した質問ノードをアンケートの最初の質問にする
    if (getNodes().filter((x) => x.type === "qNode").length === 0) {
      dispatch(actions.setFirstNodeId(newQuestionNo));
    }

    addNodes({
      id: newQuestionNo,
      data: {
        topic: "",
        choices: [{ id: newChoiceNo, content: "" }],
      },
      position,
      type: "qNode",
      dragHandle: ".dhandle",
    });

    dispatch(actions.addQnodeNum(1));
  };

  // 結果ノード追加
  const onAddResult = (position: { x: number; y: number }) => {
    const newId = getNewId();
    addNodes({
      id: newId,
      data: { result: "" },
      position,
      type: "rNode",
      dragHandle: ".dhandle",
    });

    dispatch(actions.addRnodeNum(1));
  };

  return {
    nodes,
    nodeTypes,
    onNodesChange,
    onAddQuestion,
    onAddResult,
  };
};

export default useNodeHook;
