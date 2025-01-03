import { memo, useCallback, useState, useMemo } from "react";
import { Menu, Item, TriggerEvent, ItemParams, useContextMenu } from "react-contexify";
import { toast } from "@/parts/toast/MyToaster";
import { FlowType } from "@/types";
import EditModal from "@/parts/modal/EditModal";
import { deleteFlow } from '@/db/utils'
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MENU_ID = "board-menu";

const { show } = useContextMenu({ id: MENU_ID });
export const displayMenu = (event: TriggerEvent, flowId: string, title: string, url: string) => {
  show({ event, props: { flowId, title, url } });
};

// const deleteFlow = (flowid: any) => {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// };

type DeleteFLowArgs = {
  userId: string;
  flowId: string;
};


const BoardMenu = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editId, setEditId] = useState(0);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const queryClient = useQueryClient();
  const deleteFlowMutation = useMutation<string, Error, DeleteFLowArgs>({
    mutationFn: ({ userId, flowId }) => deleteFlow({ userId, flowId }),
    onSuccess: (flowId) => {
      queryClient.setQueryData(['flows', "1"], (oldFlows: FlowType[]) => {
        return oldFlows.filter(flow => flow.id !== flowId)
      })
    }
  });



  const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);
  const handleFlowDelete = ({ props: { flowId, title } }: ItemParams) => {
    if (!confirm(`${title}を削除してよろしいですか？`)) return;

    deleteFlowMutation.mutate({ userId: "1", flowId });

  }



  const handleOpenEditModal = useCallback(
    ({ props: { title, url, flowId } }: ItemParams) => {
      setEditTitle(title);
      setEditUrl(url);
      setEditId(flowId);
      setIsOpenEditModal(true);
    },
    [setEditTitle, setEditUrl, setEditId]
  );

  const handleCopy = useCallback(async ({ props: { url } }: ItemParams) => {
    try {
      const flowFullUrl = `${BASE_URL}/${url}`;
      await navigator.clipboard.writeText(flowFullUrl);
      toast.success("URLをクリップボードにコピーしました", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("URLのコピーに失敗しました", { duration: 3000 });
    }
  }, []);

  return (
    <>
      <Menu id={MENU_ID}>
        <Item closeOnClick={true} onClick={(params) => handleOpenEditModal(params)}>
          タイトル/URLの変更
        </Item>
        <Item closeOnClick={true} onClick={(params) => handleCopy(params)}>
          URLのコピー
        </Item>
        <Item closeOnClick={true} onClick={(params) => handleFlowDelete(params)}>
          削除
        </Item>
      </Menu>

      <EditModal isOpenModal={isOpenEditModal} setIsOpenModal={setIsOpenEditModal} editTitle={editTitle} editUrl={editUrl} flowId={editId} />
    </>
  );
};

export default memo(BoardMenu);
