import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

export const fetchFlowData = async (_flowid: string) => {
  const docRef = doc(db, "flows", _flowid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};
