import { doc, addDoc, setDoc, query, where, getDoc, getDocs, updateDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "@/db/firebase";
import { initialFlow } from "@/db/constants";

export const createFlow = async (userId: string) => {
  // 親コレクションとドキュメントの参照
  const userDocRef = doc(db, "users", userId);

  // サブコレクションの参照
  const flowCollectionRef = collection(userDocRef, "flows");

  // サブコレクション内にドキュメントを追加（自動採番）
  const newFlowDocRef = await addDoc(flowCollectionRef, { ...initialFlow });

  // console.log(newFlowDocRef.id);
};

export const updateFlow = async (userId: string, flowId: string, flowData: {}) => {
  // サブコレクション内のドキュメント参照
  const flowDocRef = doc(db, "users", userId, "flows", flowId);

  // サブコレクション内のドキュメントを更新
  await updateDoc(flowDocRef, { ...flowData });
};

export const fetchFlows = async () => {
  const userId = "1";

  // 親コレクションとドキュメントの参照
  const userDocRef = doc(db, "users", userId);

  // サブコレクションの参照
  const flowCollectionRef = collection(userDocRef, "flows");

  const q = query(flowCollectionRef);
  // const q = query(flowCollectionRef, where("capital", "==", true));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

/**
 *
 * フローを単一取得
 * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja
 * @param _flowid
 * @returns
 */
export const fetchFlowData = async (_flowid: string) => {
  const collecton = "users";

  const docRef = doc(db, "flows", _flowid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};
