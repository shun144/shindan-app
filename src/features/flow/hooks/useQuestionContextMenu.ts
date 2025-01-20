import { TriggerEvent, useContextMenu } from "react-contexify";

export const QUESTION_MENU_ID = "question-menu-id";

export const useQuestionContextMenu = () => {
  const { show } = useContextMenu({ id: QUESTION_MENU_ID });

  const showQuestionContextMenu = (event: TriggerEvent, nodeId: string) => {
    show({ event, props: { nodeId } });
  };
  return { showQuestionContextMenu };
};
