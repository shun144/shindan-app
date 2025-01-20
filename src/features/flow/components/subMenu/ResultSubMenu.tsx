import { memo } from "react";
import { Menu, Item, ItemParams } from "react-contexify";
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { useAppDispatch } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";

import { RESULT_MENU_ID } from "@/features/flow/hooks/useResultContextMenu";

// export const useResultContextMenu = () => {
//   const { show } = useContextMenu({ id: MENU_ID });

//   const showResultContextMenu = (event: TriggerEvent, nodeId: string) => {
//     show({ event, props: { nodeId } });
//   };
//   return { showResultContextMenu };
// };

const ResultSubMenu = () => {
  const dispatch = useAppDispatch();
  const { deleteElements } = useReactFlow();

  const deleteNode = useCallback(
    (params: ItemParams) => {
      if (!params.props) {
        return;
      }
      deleteElements({ nodes: [{ id: params.props["nodeId"] }] });
      dispatch(actions.addRnodeNum(-1));
    },
    [deleteElements, dispatch]
  );

  return (
    <Menu id={RESULT_MENU_ID}>
      <Item closeOnClick={true} onClick={(params) => deleteNode(params)}>
        削除
      </Item>
    </Menu>
  );
};

export default memo(ResultSubMenu);
