import { db } from "@/db/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export type TotalTableData = {
  id: string;
  title: string;
  totalCount: number;
  answerNum: number;
};

type FlowRepository = {
  title: string;
  url: string;
  initFirstQuestionId: string;
  questions: string;
  results: string;
  edges: string;
  x: number;
  y: number;
  zoom: number;
  answerHistories: {
    answer: string;
    count: number;
  }[];
};

/**
 *
 * @param userId
 * @returns
 */
export const fetchTotalTableData = async (userId: string): Promise<TotalTableData[]> => {
  try {
    // コレクションの参照インスタンス取得
    const flowsRef = collection(db, `users/${userId}/flows`);

    // 複数ドキュメント取得
    const docsSnap = await getDocs(flowsRef);

    if (docsSnap.empty) return [];

    const ret = docsSnap.docs.map((doc) => {
      const docData = doc.data() as FlowRepository;
      return {
        id: doc.id,
        title: docData.title,
        totalCount: docData.answerHistories.reduce((accm, curr) => accm + curr.count, 0),
        answerNum: docData.answerHistories.length,
      };
    });
    return ret;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export type FetchGraphDataArgs = {
  userId: string;
  flowId: string;
};

type FetchGraphDataRtns = {
  answers: string[];
  counts: number[];
};

export const fetchGraphData = async (args: FetchGraphDataArgs): Promise<FetchGraphDataRtns> => {
  const { userId, flowId } = args;

  // ドキュメントの参照インスタンス取得
  const flowRef = doc(db, `users/${userId}/flows`, flowId);

  // ドキュメント取得
  const flowSnap = await getDoc(flowRef);

  if (!flowSnap.exists()) {
    return {
      answers: [],
      counts: [],
    };
  }

  const flowSnapData = flowSnap.data() as FlowRepository;

  const answers = flowSnapData.answerHistories.map((x) => x.answer);
  const counts = flowSnapData.answerHistories.map((x) => x.count);
  return { answers, counts };
};
