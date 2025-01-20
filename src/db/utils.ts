import { QueryFieldFilterConstraint, runTransaction, FirestoreError, doc, addDoc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, collection, FieldPath, documentId, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
import { db } from "@/db/firebase";
import { FlowType } from "@/types";
import { QuestionType, ResultType, DbQuestionType, DbResultType, DbEdgeType, RespondentItem } from "@/components/respondent/types";
import { type UserState } from "@/store/types";

/** * 指定したユーザIDのユーザドキュメントを作成
 * すでに作成済みの場合は更新
 * @param param0
 */
export const addUser = async ({ userId, ...userData }: UserState): Promise<void> => {
  try {
    const usersRef = doc(db, `users/${userId}`);

    await runTransaction(db, async (transaction) => {
      const docSnapshot = await transaction.get(usersRef);

      if (docSnapshot.exists()) {
        transaction.update(usersRef, userData);
      } else {
        // ドキュメントが存在しない場合、新規作成
        transaction.set(usersRef, userData);
      }
    });
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.error("Error adding document: ", error.message);
    }
  }
};

// export class RespondentData {
//   constructor(readonly title: string, readonly initFirstQuestionId: string, readonly questions: RespondentItem[], readonly results: RespondentItem[]) {}
// }

// const flowConverter: FirestoreDataConverter<RespondentData> = {
//   toFirestore(data: RespondentData): DocumentData {
//     return {};
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RespondentData {
//     const data = snapshot.data(options)!;

//     const parsedQuestions: DbQuestionType[] = JSON.parse(data.questions);
//     const parsedResults: DbResultType[] = JSON.parse(data.results);
//     const parsedEdges: DbEdgeType[] = JSON.parse(data.edges);

//     const formattedQuestions: RespondentItem[] = parsedQuestions.map((x) => {
//       return {
//         id: x.id,
//         topic: x.data.topic,
//         choices: x.data.choices.map((choice) => {
//           return {
//             id: choice.id,
//             content: choice.content,
//             nextId: parsedEdges.find((edge) => edge.sourceHandle === choice.id)?.targetHandle,
//           };
//         }),
//         category: "question",
//       };
//     });

//     const formattedResults: RespondentItem[] = parsedResults.map((x) => {
//       return {
//         id: x.id,
//         result: x.data.result,
//         message: x.data.message,
//         img: x.data.img,
//         url: x.data.url,
//         category: "result",
//       };
//     });

//     return new RespondentData(data.title, data.initFirstQuestionId, formattedQuestions, formattedResults);
//   },
// };
