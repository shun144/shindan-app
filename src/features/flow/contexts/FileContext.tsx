import { createContext, useState, PropsWithChildren, useContext } from "react";
import { type FlowFiles } from "@/features/flow/types";

interface FileContextType {
  flowFiles: FlowFiles;
  setFile: (id: string, file: File) => void; // ファイルを追加または更新
  removeFile: (id: string) => void; // ファイルを削除
}

const FileContext = createContext<FileContextType | undefined>(undefined);

/**
 * FirebaseStorageへ送信するFileオブジェクトを管理
 * @description ReduxではFileオブジェクト（非シリアライズデータ）は状態として保持できないためContextを利用
 *
 */
export const FileProvider = ({ children }: PropsWithChildren) => {
  const [flowFiles, setFiles] = useState<FlowFiles>({});

  // ファイルを追加または更新する関数
  const setFile = (id: string, file: File) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: file,
    }));
  };

  // ファイルを削除する関数
  const removeFile = (id: string) => {
    setFiles((prevFiles) => {
      const newFiles = { ...prevFiles };
      delete newFiles[id];
      return newFiles;
    });
  };

  return (
    <FileContext.Provider value={{ flowFiles, setFile, removeFile }}>
      {children}
    </FileContext.Provider>
  );
};

/**
 * FileContextからvalueを取得するためのラッパーhooks
 * @returns FileContextpe
 */
export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
