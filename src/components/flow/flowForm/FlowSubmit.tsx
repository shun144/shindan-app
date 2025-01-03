import { memo, MouseEventHandler, useCallback } from "react";
// import { useOwnerStore } from "@/Pages/Owner/store";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { useReactFlow } from "@xyflow/react";
import { toast } from "@/parts/toast/MyToaster";
import { useParams, useBeforeUnload, unstable_usePrompt } from "react-router-dom";
import { updateFlow, UpdateFlowArgs } from '@/db/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FlowType } from "@/types";
import { checkDummyAuthStatus } from "@/utils";
import { buttonTv } from '@/tv'
import useFlowSubmitValidate from './useFlowSubmitValidate'




const FlowSubmit = () => {

  const { firstNodeId, isDirty, flowTitle, flowUrl, flowImages } = useAppSelector((state) => ({
    firstNodeId: state.flow.firstNodeId,
    isDirty: state.flow.isDirty,
    flowTitle: state.flow.flowTitle,
    flowUrl: state.flow.flowUrl,
    flowImages: state.flow.flowImages,
  }));


  const userId = checkDummyAuthStatus() as string;

  const { flowId } = useParams();

  const { checkIsValidateError } = useFlowSubmitValidate(flowId!);

  const { getNodes, getEdges, getViewport } = useReactFlow();


  const dispatch = useAppDispatch();
  const updateFlowMutation = useMutation<boolean, Error, UpdateFlowArgs>({
    mutationFn: (args) => updateFlow(args)
  })

  // ページリロード時の確認ダイアログ
  // beforeunloadは標準ダイアログしかだせない
  useBeforeUnload(useCallback((event) => {
    if (!isDirty) return
    event.preventDefault();
  }, [isDirty]));

  // 別SPAページに遷移する際の確認ダイアログ
  unstable_usePrompt({
    message: "保存されていないアンケートの変更があります",
    when: ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  });

  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();

    // タイトルとURLのエラークリア
    dispatch(actions.clearSubmitError())

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
      }
    };

    updateFlowMutation.mutate(updateFlowArgs, {
      onSuccess: () => {
        toast.success("保存しました", { duration: 4000 });
        dispatch(actions.setIsDirty(false));
      },
      onError: () => {
        toast.error("保存に失敗しました", { duration: 5000 });
        dispatch(actions.setIsDirty(true));
      }
    });





    // const nodes = getNodes();
    // const edges = getEdges();
    // const questions = nodes.filter((x) => x.type === "qNode");
    // const results = nodes.filter((x) => x.type === "rNode");
    // const { x, y, zoom } = getViewport();
    // const formData = new FormData();

    // // JSON.stringifyしたデータをFormDataに追加
    // formData.append("update_questions", JSON.stringify(questions));
    // formData.append("update_results", JSON.stringify(results));
    // formData.append("update_edges", JSON.stringify(edges));

    // // その他のフィールドをそのまま追加
    // formData.append("first_question_id", firstNodeId.toString());
    // formData.append("title", flowTitle);
    // formData.append("url", flowUrl);
    // formData.append("x", x.toString());
    // formData.append("y", y.toString());
    // formData.append("zoom", zoom.toString());

    // // 画像ファイルを追加
    // flowImages.forEach(({ nodeId, file }, index) => {
    //   formData.append(`images[${index}]`, file);
    //   formData.append(`imageNodeIds[${index}]`, nodeId);
    // });

    // router.post(`/flow/${flowId}`, formData, {
    //   onSuccess: () => {
    //     setSubmitError({});
    //     toast.success("保存しました", { duration: 4000 });
    //     setIsDirty(false);
    //   },
    //   onError: (err) => {
    //     setSubmitError(err);
    //     for (const value of Object.values(err)) {
    //       toast.error(value, { duration: 5000 });
    //     }
    //   },
    // });
  };


  return (
    <button onClick={handleSubmit}
      className={buttonTv({ className: "relative" })}
    >
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
