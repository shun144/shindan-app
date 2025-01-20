import { TriggerEvent, useContextMenu } from "react-contexify";

// メニューIDを固定で使用
export const RESULT_MENU_ID = "result-menu-id";

export const useResultContextMenu = () => {
  const { show } = useContextMenu({ id: RESULT_MENU_ID });

  const showResultContextMenu = (event: TriggerEvent, nodeId: string) => {
    show({ event, props: { nodeId } });
  };
  return { showResultContextMenu };
};
