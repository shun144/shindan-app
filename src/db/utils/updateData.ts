import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { FlowType } from "@/types";

type Callbacks = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const updateFlowData = async (id: string, data: Omit<FlowType, "id">, { onSuccess, onError }: Callbacks = {}) => {
  const washingtonRef = doc(db, "flows", id);

  try {
    await updateDoc(washingtonRef, { ...data });
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebaseConfig";

export const uploadImageToStorage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);

  // ファイルをStorageにアップロード
  await uploadBytes(storageRef, file);

  // アップロード後のダウンロードURLを取得
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
