import { memo } from "react";
import { Menu, Item, TriggerEvent, ItemParams, useContextMenu } from "react-contexify";
import { useReactFlow } from "@xyflow/react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";

const QUESTION_MENU_ID = "question-menu-id";
const { show } = useContextMenu({ id: QUESTION_MENU_ID });

export const showQuestionContextMenu = (event: TriggerEvent, nodeId: string) => {
  show({ event, props: { nodeId } });
};

const QuestionSubMenu = () => {
  const { deleteElements } = useReactFlow();
  const firstNodeId = useAppSelector((state) => state.flow.firstNodeId);

  const dispatch = useAppDispatch();

  const handleUpdateFirstQuestion = (params: ItemParams) => {
    if (!params.props) return;
    dispatch(actions.setFirstNodeId(params.props["nodeId"]));
  };

  const deleteNode = (params: ItemParams) => {
    if (!params.props) {
      return;
    }

    deleteElements({ nodes: [{ id: params.props["nodeId"] }] });

    if (firstNodeId === params.props["nodeId"]) {
      dispatch(actions.setFirstNodeId(""));
    }

    dispatch(actions.addQnodeNum(-1));
  };

  return (
    <Menu id={QUESTION_MENU_ID}>
      <Item closeOnClick={true} onClick={(params) => handleUpdateFirstQuestion(params)}>
        1問目に設定
      </Item>
      <Item closeOnClick={true} onClick={(params) => deleteNode(params)}>
        削除
      </Item>
    </Menu>
  );
};

export default memo(QuestionSubMenu);
