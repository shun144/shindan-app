import { QueryFieldFilterConstraint, runTransaction, FirestoreError, doc, addDoc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, collection, FieldPath, documentId, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
import { db } from "@/db/firebase";

/**
 * ドキュメントIDを取得
 * @param path
 * @param condition
 * @returns
 */
const getDocId = async (path: string, condition: QueryFieldFilterConstraint) => {
  const collectionRef = collection(db, path);
  const q = query(collectionRef, condition);
  const docSnapshot = await getDocs(q);
  if (docSnapshot.empty) {
    return null;
  } else {
    return docSnapshot.docs[0].id;
  }
};

type AddAnswerHistoryArgs = {
  shopName: string;
  url: string;
  answer: string;
};

type StoredAnswerHistory = {
  answer: string;
  count: number;
};

function updateAnswerHistories(histories: StoredAnswerHistory[], answer: string) {
  let isUpdated = false;

  // `map`を使用しつつ、一致する要素があればその場で更新
  const updatedItems = histories.map((item) => {
    if (item.answer === answer) {
      isUpdated = true;
      return { ...item, count: item.count + 1 };
    }
    return item;
  });

  // 一致する要素がなければ新しい要素を追加
  if (!isUpdated) {
    return [...updatedItems, { answer, count: 1 }];
  }
  return updatedItems;
}

export const countUpAnswerHistory = async ({ shopName, url, answer }: AddAnswerHistoryArgs): Promise<void> => {
  try {
    const userId = await getDocId("users", where("shopName", "==", shopName));
    if (userId === null) {
      return;
    }

    const collectionRef = collection(db, `users/${userId}/flows`);
    const q = query(collectionRef, where("url", "==", url));
    const docsSnapshot = await getDocs(q);

    await runTransaction(db, async (transaction) => {
      if (!docsSnapshot.empty) {
        const flowDoc = docsSnapshot.docs[0];
        const flowRef = doc(db, `users/${userId}/flows/${flowDoc.id}`);
        const storedAnswerHistory = flowDoc.data().answerHistories as StoredAnswerHistory[];
        const newAnswerHistories = updateAnswerHistories(storedAnswerHistory, answer);
        transaction.update(flowRef, { answerHistories: newAnswerHistories });
      }
    });
  } catch (error) {
    console.error("Error querying Firestore: ", error);
  }
};

// import { QueryFieldFilterConstraint, runTransaction, FirestoreError, doc, addDoc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, collection, FieldPath, documentId, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
// import { db } from "@/db/firebase";

// /**
//  * ドキュメントIDを取得
//  * @param path
//  * @param condition
//  * @returns
//  */
// const getDocId = async (path: string, condition: QueryFieldFilterConstraint) => {
//   const collectionRef = collection(db, path);
//   const q = query(collectionRef, condition);
//   const docSnapshot = await getDocs(q);
//   if (docSnapshot.empty) {
//     return null;
//   } else {
//     return docSnapshot.docs[0].id;
//   }
// };

// type AddAnswerHistoryArgs = {
//   shopName: string;
//   url: string;
//   answer: string;
// };

// export const countUpAnswerHistory = async ({ shopName, url, answer }: AddAnswerHistoryArgs): Promise<void> => {
//   try {
//     const userId = await getDocId("users", where("shopName", "==", shopName));
//     if (userId === null) {
//       return;
//     }

//     const flowId = await getDocId(`users/${userId}/flows`, where("url", "==", url));
//     if (flowId === null) {
//       return;
//     }

//     const answerHistoriesRef = doc(db, `users/${userId}/flows/${flowId}/answerHistories/${answer}`);

//     // runTransaction 内でデータを取得・更新します。
//     // トランザクションによりデータの一貫性が保証され、他のクライアントが同時にアクセスしても問題ありません。
//     await runTransaction(db, async (transaction) => {
//       const docSnapshot = await transaction.get(answerHistoriesRef);

//       if (docSnapshot.exists()) {
//         // ドキュメントが存在する場合、count フィールドを +1
//         const currentCount = docSnapshot.data().count || 0;
//         transaction.update(answerHistoriesRef, { count: currentCount + 1 });
//       } else {
//         // ドキュメントが存在しない場合、新規作成
//         transaction.set(answerHistoriesRef, { count: 1 });
//       }
//     });

//   } catch (error) {
//     console.error("Error querying Firestore: ", error);
//   }
// };
