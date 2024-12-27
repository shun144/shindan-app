import { memo, MouseEventHandler } from "react";
// import { useOwnerStore } from "@/Pages/Owner/store";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { useReactFlow } from "@xyflow/react";
import { toast } from "@/parts/toast/MyToaster";
import { useParams } from "react-router-dom";
import { updateFlowData } from "@/db/utils/updateData";
import { FlowType } from "@/types";

const FlowSubmit = () => {
  const { flowId } = useParams();
  const { getNodes, getEdges, getViewport } = useReactFlow();

  const dispatch = useAppDispatch();

  const { firstNodeId, isDirty, flowTitle, flowUrl, flowImages } = useAppSelector((state) => ({
    firstNodeId: state.flow.firstNodeId,
    isDirty: state.flow.isDirty,
    flowTitle: state.flow.flowTitle,
    flowUrl: state.flow.flowUrl,
    flowImages: state.flow.flowImages,
  }));
  //   const setSubmitError = useOwnerStore((state) => state.setSubmitError);

  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();

    const nodes = getNodes();
    const edges = getEdges();
    const questions = nodes.filter((x) => x.type === "qNode");
    const results = nodes.filter((x) => x.type === "rNode");
    const { x, y, zoom } = getViewport();

    const data: Omit<FlowType, "id"> = {
      title: flowTitle,
      url: flowUrl,
      initFirstQuestionId: firstNodeId,
      questions: JSON.stringify(questions),
      results: JSON.stringify(results),
      edges: JSON.stringify(edges),
      x,
      y,
      zoom,
    };

    updateFlowData(flowId!, data, {
      onSuccess: () => {
        // setSubmitError({});
        toast.success("保存しました", { duration: 4000 });
        dispatch(actions.setIsDirty(false));
      },
    });

    // if (!firstNodeId) {
    //   toast.error("1問目の質問を作成してください", { duration: 5000 });
    //   return;
    // }

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
    <>
      <button onClick={handleSubmit} className="relative w-full h-full bg-indigo-500 px-2 text-white rounded-md shadow-xl transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200">
        保 存
        {isDirty && (
          <span className="absolute flex h-3 w-3 -top-1 -right-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 opacity-85"></span>
          </span>
        )}
      </button>
    </>
  );
};

export default memo(FlowSubmit);
