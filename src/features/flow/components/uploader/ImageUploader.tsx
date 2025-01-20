import { memo, useState, ChangeEvent, MouseEvent, useMemo } from "react";
import { useViewImage } from "./useViewImage";
import { useReactFlow } from "@xyflow/react";
import { useFileContext } from "@/features/flow/hooks/useFileContext";

type Props = {
  nodeId: string;
  initImgUrl?: string;
};
const BASE_URL = window.location.origin;
const ImageUploader = ({ nodeId, initImgUrl }: Props) => {
  const { updateNodeData } = useReactFlow();
  const { setFile, removeFile } = useFileContext();
  const IMG_ID = useMemo(() => `img-${nodeId}`, [nodeId]);

  const [imageData, setImageData] = useState<File | string | undefined>(initImgUrl);

  const viewImage = useViewImage({ imageData });

  /**
   * アップロード画像の変更
   * @param event
   * @returns
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (!target || !target.files) return;

    const targetFile = target.files[0];
    setImageData(targetFile);
    setFile(nodeId, targetFile);

    const fileExt = targetFile.name.split(".").pop();
    const savedImageUrl = `${BASE_URL}/storage/images/${nodeId}.${fileExt}`;
    updateNodeData(nodeId, { img: savedImageUrl });
  };

  const handleCancelImage = (event: MouseEvent<HTMLImageElement>) => {
    if (!confirm("画像を削除しますか？")) return;
    event.preventDefault();
    setImageData(undefined);

    removeFile(nodeId);
    updateNodeData(nodeId, { img: "" });
  };

  return (
    <label
      className="w-full h-32 border border-dashed bg-slate-900  border-slate-300 rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
      htmlFor={IMG_ID}
    >
      {viewImage ? (
        <img
          className="w-full h-full object-scale-down"
          src={viewImage}
          alt="アップロード画像"
          onClick={handleCancelImage}
        />
      ) : (
        // <img className="w-full h-full object-scale-down" src="https://firebasestorage.googleapis.com/v0/b/shindan-app.firebasestorage.app/o/images%2F1%2F237-400x300.jpg?alt=media&token=a83e3aea-7155-4584-9703-26a52a81ebb5" alt="アップロード画像" onClick={handleCancelImage} />
        <>
          <span className="text-slate-500">画像をアップロード</span>
          <input
            id={IMG_ID}
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            hidden
          />
        </>
      )}
    </label>
  );
};

export default memo(ImageUploader);
