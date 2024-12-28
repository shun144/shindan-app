import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

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

// export const fetchFlowData = async (_flowid: string) => {
//   const collecton = "users";;

//   const docRef = doc(db, "flows", _flowid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data();
//   } else {
//     throw new Error("No such document!");
//   }
// };
