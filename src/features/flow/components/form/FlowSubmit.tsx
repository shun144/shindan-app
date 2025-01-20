import { memo, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { useReactFlow } from "@xyflow/react";
import { toast } from "@/components/toast/MyToaster";
import { useParams } from "react-router-dom";
import { updateFlow, UpdateFlowArgs } from "@/db/functions/flow";
import { useMutation } from "@tanstack/react-query";
import { checkDummyAuthStatus } from "@/utils/userUtils";
import { buttonTv } from "@/lib/buttonTv";
import useFlowSubmitValidate from "./useFlowSubmitValidate";
import { useFileContext } from "@/features/flow/contexts";
import { useCommitPendingContext } from "@/features/flow/contexts";

const FlowSubmit = () => {
  const { firstNodeId, isDirty, flowTitle, flowUrl } = useAppSelector((state) => ({
    firstNodeId: state.flow.firstNodeId,
    isDirty: state.flow.isDirty,
    flowTitle: state.flow.flowTitle,
    flowUrl: state.flow.flowUrl,
  }));

  const { userId } = checkDummyAuthStatus();

  const { flowId } = useParams();

  const { flowFiles } = useFileContext();

  const { getNodes, getEdges, getViewport } = useReactFlow();

  // 保存処理のisPendingのset関数
  const { setIsCommitPending } = useCommitPendingContext();

  const dispatch = useAppDispatch();
  const updateFlowMutation = useMutation<void, Error, UpdateFlowArgs>({
    mutationFn: (args) => updateFlow(args),
    // 開始時
    onMutate: () => setIsCommitPending(true),

    // 成功時または失敗時
    onSettled: () => setIsCommitPending(false),
  });

  const { checkIsValidateError } = useFlowSubmitValidate(flowId!);
  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();

    // タイトルとURLフォームにある既存エラー（前回エラー）をクリアする
    dispatch(actions.clearSubmitError());

    // 様々なバリデーションを行う
    // この処理の中でエラートースト表示などエラーUI処理も行っている
    if (await checkIsValidateError()) return;

    const nodes = getNodes();
    const edges = getEdges();
    const questions = nodes.filter((x) => x.type === "qNode");
    const results = nodes.filter((x) => x.type === "rNode");
    const { x, y, zoom } = getViewport();

    const updateFlowArgs: UpdateFlowArgs = {
      userId: userId!,
      flowData: {
        id: flowId!,
        title: flowTitle,
        url: flowUrl,
        initFirstQuestionId: firstNodeId,
        questions: JSON.stringify(questions),
        results: JSON.stringify(results),
        edges: JSON.stringify(edges),
        x,
        y,
        zoom,
      },
      flowFiles,
    };

    updateFlowMutation.mutate(updateFlowArgs, {
      onSuccess: () => {
        toast.success("保存しました", { duration: 4000 });
        dispatch(actions.setIsDirty(false));
      },
      onError: () => {
        toast.error("保存に失敗しました", { duration: 5000 });
        dispatch(actions.setIsDirty(true));
      },
    });
  };

  return (
    <button onClick={handleSubmit} className={buttonTv({ className: "relative" })}>
      保 存
      {isDirty && (
        <span className="absolute flex h-3 w-3 -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 opacity-85"></span>
        </span>
      )}
    </button>
  );
};

export default memo(FlowSubmit);
