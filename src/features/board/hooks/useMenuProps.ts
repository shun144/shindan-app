import { useRef, useState } from "react";
import { useContextMenu, TriggerEvent } from "react-contexify";

const useMenuProps = () => {
  const MENU_ID = "board-menu";

  //   const title = useRef("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [flowId, setFlowId] = useState("");

  const { show } = useContextMenu({ id: MENU_ID });
  const displayMenu = (event: TriggerEvent, flowId: string, title: string, url: string) => {
    setFlowId(flowId);
    setTitle(title);
    setUrl(url);
    show({ event, props: { flowId, title, url } });
  };

  return { menuId: MENU_ID, displayMenu, title, url, flowId };
};

export default useMenuProps;
