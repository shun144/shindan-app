import { doc, addDoc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, collection, FieldPath, documentId, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
import { db } from "@/db/firebase";
import { initialFlow } from "@/db/constants";
import { FlowType, CreateFLowArgs } from "@/types";
import { omit } from "lodash";
import { QuestionType, ResultType, DbQuestionType, DbResultType, DbEdgeType, RespondentItem } from '@/components/respondent/types'




export const createFlow = async (data: CreateFLowArgs): Promise<FlowType> => {

  const userId = data.userId;
  // 親コレクションとドキュメントの参照
  const userDocRef = doc(db, "users", userId);

  // サブコレクションの参照
  const flowCollectionRef = collection(userDocRef, "flows");

  const newFlow = { ...initialFlow, ...omit(data, ['userId']) }

  // サブコレクション内にドキュメントを追加（自動採番）
  const newFlowDocRef = await addDoc(flowCollectionRef, newFlow);

  return { id: newFlowDocRef.id, ...newFlow, };

};

export type UpdateFlowArgs = {
  userId: string;
  flowData: FlowType
}


/**
 * アンケートの更新
 * @param args 
 * @returns 
 */
export const updateFlow = async ({ userId, flowData }: UpdateFlowArgs): Promise<boolean> => {

  // サブコレクション内のドキュメント参照
  const flowDocRef = doc(db, "users", userId, "flows", flowData.id);

  const updateFlowData = omit(flowData, ["id"])

  try {

    // サブコレクション内のドキュメントを更新
    await updateDoc(flowDocRef, { ...updateFlowData });

    return true;

  } catch (error) {

    return false;

  }
};


/**
 * フローを複数取得
 * @param userId 
 */
export const fetchFlows = async (userId: string) => {

  // 親コレクションとドキュメントの参照
  const userDocRef = doc(db, "users", userId);

  // サブコレクションの参照
  const flowCollectionRef = collection(userDocRef, "flows");

  const q = query(flowCollectionRef);

  const querySnapshot = await getDocs(q);

  const flows: FlowType[] = querySnapshot.docs.map((doc) => ({
    id: doc.id, // ドキュメントIDを追加
    ...doc.data(), // ドキュメントデータを展開
  })) as FlowType[]; // 型アサーションを適用
  return flows

};

/**
 *
 * フローを単一取得（ID指定）
 * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja
 * @param _flowid
 * @returns
 */
export const fetchFlow = async (userId: string, flowId: string) => {
  // const userId = "1";
  // const flowId = "1rqDFWxdbKYdDeJKeXe2"
  const userDocRef = doc(db, "users", userId);
  const flowCollectionRef = collection(userDocRef, "flows");
  const flowDocRef = doc(flowCollectionRef, flowId);
  const docSnap = await getDoc(flowDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};


export class RespondentData {
  constructor(
    readonly title: string,
    readonly initFirstQuestionId: string,
    readonly questions: RespondentItem[],
    readonly results: RespondentItem[],
  ) { }
}

const flowConverter: FirestoreDataConverter<RespondentData> = {
  toFirestore(data: RespondentData): DocumentData {
    return {
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): RespondentData {
    const data = snapshot.data(options)!;

    const parsedQuestions: DbQuestionType[] = JSON.parse(data.questions);
    const parsedResults: DbResultType[] = JSON.parse(data.results);
    const parsedEdges: DbEdgeType[] = JSON.parse(data.edges);

    const formattedQuestions: RespondentItem[] = parsedQuestions.map((x) => {
      return {
        id: x.id,
        topic: x.data.topic,
        choices: x.data.choices.map(choice => {
          return {
            id: choice.id,
            content: choice.content,
            nextId: parsedEdges.find(edge => edge.sourceHandle === choice.id)?.targetHandle
          }
        }),
        category: 'question',
      }
    })

    const formattedResults: RespondentItem[] = parsedResults.map((x) => {
      return {
        id: x.id,
        result: x.data.result,
        message: x.data.message,
        img: x.data.img,
        url: x.data.url,
        category: 'result',
      }
    })


    return new RespondentData(
      data.title,
      data.initFirstQuestionId,
      formattedQuestions,
      formattedResults,
    );
  }
}


/**
 *
 * フローを単一取得（URL指定）
 * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja
 * @param 
 * @returns
 */
export const fetchFlowByUrl = async (userId: string, flowUrl: string) => {

  const flowCollectionRef = collection(db, `users/${userId}/flows`).withConverter(flowConverter);
  const q = query(flowCollectionRef, where("url", "==", flowUrl));

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map(doc => doc.data())[0];


  return data;
};

type DeleteFLowArgs = {
  userId: string;
  flowId: string;
};
export const deleteFlow = async ({ userId, flowId }: DeleteFLowArgs): Promise<string> => {
  const useDocRef = doc(db, "users", userId);
  const flowCollectionRef = collection(useDocRef, "flows");
  const flowDocRef = doc(flowCollectionRef, flowId);
  await deleteDoc(flowDocRef);
  return flowId;
}

type CheckDupFlowUrlArgs = {
  userId: string;
  flowId: string;
  url: string;
};

/**
 * フローURLの重複チェック
 * @param param0 
 * @returns 
 */
export const checkIsDupFlowUrl = async ({ userId, flowId, url }: CheckDupFlowUrlArgs): Promise<boolean> => {
  const flowCollectionRef = collection(db, `users/${userId}/flows`);

  const q = query(flowCollectionRef, where(documentId(), "!=", flowId), where("url", "==", url));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty

}




