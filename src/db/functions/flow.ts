import {
  doc,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  documentId,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
  Query,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "@/db/firebase";
import {
  DbQuestionType,
  DbResultType,
  DbEdgeType,
  RespondentItem,
} from "@/features/respondent/types";
import { FlowType } from "@/types";
import { initialFlow } from "@/db/constants";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { type FlowFiles, type ResultNodeType } from "@/features/flow/types";
import { NodeProps, Node } from "@xyflow/react";

/**
 * アンケートの単一取得
 * @param userId
 * @param flowId
 * @returns
 */
export const fetchFlow = async (userId: string, flowId: string) => {
  // ドキュメントの参照インスタンス取得
  const flowRef = doc(db, `users/${userId}/flows`, flowId);

  // 単一ドキュメント取得
  const docSnap = await getDoc(flowRef);

  if (docSnap.exists()) {
    return docSnap.data() as FlowType;
  } else {
    return null;
  }
};

/**
 * アンケートの複数取得
 * @param userId
 * @returns
 */
export const fetchFlows = async (userId: string) => {
  // コレクションの参照インスタンス取得
  const flowsRef = collection(db, `users/${userId}/flows`);

  // 並び替え
  const q = query(flowsRef, orderBy("timestamp", "desc")); // 降順 (新しい順)

  // 複数ドキュメント取得
  const docsSnap = await getDocs(q);

  if (docsSnap.empty) {
    return [];
  } else {
    const flows = docsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FlowType[];
    return flows;
  }
};

export type CreateFLowArgs = {
  userId: string;
  title: string;
  url: string;
};

/**
 * アンケートの追加
 * @param args
 * @returns
 */
export const createFlow = async (args: CreateFLowArgs): Promise<FlowType> => {
  const { userId, ...flowData } = args;

  const flowsRef = collection(db, `users/${userId}/flows`);

  // コレクション内にドキュメントを追加（自動採番）
  const addDocRef = await addDoc(flowsRef, {
    ...initialFlow,
    ...flowData,
    answerHistories: [],
    timestamp: Timestamp.now(),
  });

  return {
    id: addDocRef.id,
    ...initialFlow,
    ...flowData,
  };
};

export type UpdateTitleUrlArgs = {
  userId: string;
  flowId: string;
  title: string;
  url: string;
};

export type UpdateTitleUrlRtns = {
  flowId: string;
  title: string;
  url: string;
};
export const updateTitleUrl = async (args: UpdateTitleUrlArgs): Promise<UpdateTitleUrlRtns> => {
  const { userId, flowId, ...flowData } = args;

  const flowRef = doc(db, `users/${userId}/flows`, flowId);

  // ドキュメント更新
  await updateDoc(flowRef, { ...flowData });

  return {
    flowId,
    title: flowData.title,
    url: flowData.url,
  };
};

export type UpdateFlowArgs = {
  userId: string;
  flowData: FlowType;
  flowFiles: FlowFiles;
};

export type UpdateFlowRtn = UploadedImageMetadata | null;

/**
 * アンケートの更新
 * @param args
 * @returns
 */
export const updateFlow = async (args: UpdateFlowArgs) => {
  try {
    const { id: flowId, ...updateFlowData } = args.flowData;

    const flowFiles = isEmptyObject(args.flowFiles) ? null : args.flowFiles;

    // サブコレクション内のドキュメント参照
    const flowRef = doc(db, `users/${args.userId}/flows`, flowId);

    // let uploadedImageMetadata: UploadedImageMetadata | null = null;

    let newUpdateFlowData = { ...updateFlowData };
    if (flowFiles) {
      const uploadedImageMetadata = await uploadMultiImage(flowFiles, args.userId);

      const prevResults: NodeProps<Node<ResultNodeType>>[] = JSON.parse(updateFlowData.results);

      // アップロード画像のURLを追加
      const newResults = prevResults.map((result) => {
        const metaData = uploadedImageMetadata.find((meta) => result.id === meta.nodeId);
        if (metaData) {
          return {
            ...result,
            data: {
              ...result.data,
              img: metaData.imgURL,
            },
          };
        } else {
          return result;
        }
      });
      newUpdateFlowData = { ...newUpdateFlowData, results: JSON.stringify(newResults) };
    }

    // ドキュメント更新
    await updateDoc(flowRef, { ...newUpdateFlowData });

    // return uploadedImageMetadata;
  } catch (error) {
    console.error(error);
  }
};

interface UploadedImageMetadata {
  nodeId: string;
  imgURL: string;
}

export async function uploadMultiImage(
  flowFiles: FlowFiles,
  userId: string
): Promise<UploadedImageMetadata[]> {
  try {
    // for (const [id, file] of Object.entries(flowFiles)) {
    //   await uploadImage(id, file, userId);
    // }

    // 各ファイルのアップロード処理を非同期で実行
    const uploadPromises = Object.entries(flowFiles).map(
      ([id, file]) => uploadImage(id, file, userId) // uploadImage が UploadedImageMetadata を返す
    );

    // 全ての処理が完了するのを待機
    const uploadedMetadata = await Promise.all(uploadPromises);

    return uploadedMetadata;
  } catch {
    return []; // エラー時は空配列を返す
  }
}

// ファイルアップロード関数
export async function uploadImage(id: string, file: File, userId: string) {
  try {
    // ファイル拡張子取得
    const fileExt = file.name.split(".").pop();

    // Firebase Storageの参照を作成
    const storageRef = ref(storage, `images/${userId}/${id}.${fileExt}`);

    // ファイルをアップロード
    await uploadBytes(storageRef, file);
    // const snapshot = await uploadBytes(storageRef, flowImage.file);
    // console.log("Uploaded a file:", snapshot.metadata);

    // ダウンロードURLを取得
    const downloadURL = await getDownloadURL(storageRef);

    return {
      nodeId: id,
      imgURL: downloadURL,
    };

    // // Firestoreに保存
    // const docRef = doc(db, "users", userId);
    // await setDoc(docRef, metadata);
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      nodeId: id,
      imgURL: "",
    };
  }
}

// // ファイルアップロード関数
// export async function uploadImage(flowFiles: FlowFiles, userId: string) {
//   try {
//     // ファイル拡張子取得
//     const fileExt = flowImage.file.name.split(".").pop();

//     // Firebase Storageの参照を作成
//     const storageRef = ref(storage, `images/${userId}/${flowImage.nodeId}.${fileExt}`);

//     // ファイルをアップロード
//     await uploadBytes(storageRef, flowImage.file);
//     // const snapshot = await uploadBytes(storageRef, flowImage.file);
//     // console.log("Uploaded a file:", snapshot.metadata);

//     // ダウンロードURLを取得
//     const downloadURL = await getDownloadURL(storageRef);

//     const uploadedImageMetadata: UploadedImageMetadata = {
//       nodeId: flowImage.nodeId,
//       downloadURL,
//     };

//     return uploadedImageMetadata;

//     // // Firestoreに保存
//     // const docRef = doc(db, "users", userId);
//     // await setDoc(docRef, metadata);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// }

export type DeleteFLowArgs = {
  userId: string;
  flowId: string;
};
/**
 * アンケートの削除
 * @param args
 * @returns
 */
export const deleteFlow = async (args: DeleteFLowArgs) => {
  const { userId, flowId } = args;
  const flowRef = doc(db, `users/${userId}/flows`, flowId);
  await deleteDoc(flowRef);
  return flowId;
};

type checkIsDupUrlArgs = {
  userId: string;
  flowId?: string;
  url: string;
};
/**
 * URLの重複チェック
 * @param args
 * @returns
 */
export const checkIsDupUrl = async (args: checkIsDupUrlArgs) => {
  const { userId, flowId, url } = args;

  const flowsRef = collection(db, `users/${userId}/flows`);
  let q: Query<DocumentData, DocumentData>;

  // flowIdがある場合は自身以外の重複をチェックする
  if (flowId) {
    q = query(flowsRef, where(documentId(), "!=", flowId), where("url", "==", url));
  } else {
    q = query(flowsRef, where("url", "==", url));
  }
  const docsSnap = await getDocs(q);
  return !docsSnap.empty;
};

/**
 *
 */
export class RespondentData {
  constructor(
    readonly title: string,
    readonly initFirstQuestionId: string,
    readonly questions: RespondentItem[],
    readonly results: RespondentItem[]
  ) {}
}

const flowConverter: FirestoreDataConverter<RespondentData> = {
  toFirestore(data: RespondentData): DocumentData {
    return {
      data,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RespondentData {
    const data = snapshot.data(options)!;

    const parsedQuestions: DbQuestionType[] = JSON.parse(data.questions);
    const parsedResults: DbResultType[] = JSON.parse(data.results);
    const parsedEdges: DbEdgeType[] = JSON.parse(data.edges);

    const formattedQuestions: RespondentItem[] = parsedQuestions.map((x) => {
      return {
        id: x.id,
        topic: x.data.topic,
        choices: x.data.choices.map((choice) => {
          return {
            id: choice.id,
            content: choice.content,
            nextId: parsedEdges.find((edge) => edge.sourceHandle === choice.id)?.targetHandle,
          };
        }),
        category: "question",
      };
    });

    const formattedResults: RespondentItem[] = parsedResults.map((x) => {
      return {
        id: x.id,
        result: x.data.result,
        message: x.data.message,
        img: x.data.img,
        url: x.data.url,
        category: "result",
      };
    });

    return new RespondentData(
      data.title,
      data.initFirstQuestionId,
      formattedQuestions,
      formattedResults
    );
  },
};

/**
 * URLからアンケートを取得
 * @param userId
 * @param flowUrl
 * @returns
 */
export const fetchFlowByUrl = async (shopName: string, flowUrl: string) => {
  const userId = await getUserIdByShopName(shopName);

  if (userId === null) {
    throw new Error("指定されたショップが見つかりません");
  }

  const flowData = await getFlowDataByUserId(userId, flowUrl);
  if (flowData === null) {
    throw new Error("指定されたURLのアンケートが見つかりません");
  }
  return flowData;
};

// ユーザIDを取得する関数
async function getUserIdByShopName(shopName: string): Promise<string | null> {
  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("shopName", "==", shopName));
  const userSnapshot = await getDocs(userQuery);
  return userSnapshot.empty ? null : userSnapshot.docs[0].id;
}

// アンケート情報を取得する関数
async function getFlowDataByUserId(userId: string, flowUrl: string) {
  const flowsRef = collection(db, `users/${userId}/flows`).withConverter(flowConverter);
  const flowQuery = query(flowsRef, where("url", "==", flowUrl));
  const flowSnapshot = await getDocs(flowQuery);
  return flowSnapshot.empty ? null : flowSnapshot.docs[0].data();
}

// export const fetchFlowByUrl = async (userId: string, flowUrl: string) => {
//   try {
//     const flowsRef = collection(db, `users/${userId}/flows`).withConverter(flowConverter);
//     const q = query(flowsRef, where("url", "==", flowUrl));
//     const docsSnapshot = await getDocs(q);
//     if (docsSnapshot.empty) {
//       throw new Error("指定されたURLのアンケートがありません");
//     }
//     const data = docsSnapshot.docs.map((doc) => doc.data())[0];
//     return data;
//   } catch (error) {
//     throw error; // エラーを呼び出し元に再スロー
//   }
// };

function isEmptyObject(obj: object) {
  // obj.constructor を使うと、オブジェクトがどのコンストラクタ（クラス）から生成されたかを確認できる。
  // 純粋なオブジェクト {} の場合、obj.constructor は Object をさす
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
