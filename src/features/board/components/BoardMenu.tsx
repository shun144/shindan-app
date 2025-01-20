import { memo, useMemo } from "react";
import { Menu, Item } from "react-contexify";
import { toast } from "react-hot-toast";
import "@/features/board/assets/boardMenu.scss";
import { type BoardItemType } from "@/features/board/types";
import useDeleteFlow from "@/features/board/hooks/useDeleteFlow";
import { checkDummyAuthStatus } from "@/utils/userUtils";

type Props = {
  menuId: string;
  boardItem: BoardItemType;
  handleOpenEditModal: (boardItem: BoardItemType) => void;
};

const BoardMenu = ({ menuId, boardItem, handleOpenEditModal }: Props) => {
  const { userId, shopName } = checkDummyAuthStatus();
  const { flowId, title, url } = boardItem;

  const { deleteFlowMutation } = useDeleteFlow();
  const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);

  // 編集用モーダル表示
  const openModal = () => {
    handleOpenEditModal(boardItem);
  };

  // URLコピー
  const copyUrl = async () => {
    try {
      const flowFullUrl = `${BASE_URL}/${shopName}/${url}`;
      await navigator.clipboard.writeText(flowFullUrl);
      toast.success("URLをクリップボードにコピーしました", {
        duration: 3000,
      });
    } catch {
      toast.error("URLのコピーに失敗しました", { duration: 3000 });
    }
  };

  // アンケート削除
  const handleFlowDelete = () => {
    if (!confirm(`${title}を削除してよろしいですか？`)) return;
    deleteFlowMutation.mutate({ userId: userId!, flowId: flowId! });
  };

  return (
    <Menu id={menuId} animation="fade">
      <Item closeOnClick={true} onClick={openModal}>
        タイトル/URLの変更
      </Item>
      <Item closeOnClick={true} onClick={copyUrl}>
        URLのコピー
      </Item>
      <Item closeOnClick={true} onClick={handleFlowDelete}>
        削除
      </Item>
    </Menu>
  );
};

export default memo(BoardMenu);
