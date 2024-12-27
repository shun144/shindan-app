import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

const useGetDoc = (id: string) => {
  const dispatch = useAppDispatch();

  let initialQuestions = "";
  let initialResults = "";
  let initialEdges = "";
  let initialX = 0;
  let initialY = 0;
  let initialZoom = 0;

  console.log("bbb");
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "flows", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        dispatch(actions.setFlowId(docData.id));
        dispatch(actions.setFirstNodeId(docData.initFirstQuestionId));
        dispatch(actions.setFlowTitle(docData.title));
        dispatch(actions.setFlowUrl(docData.url));
        initialQuestions = docData.questions;
        initialResults = docData.results;
        initialEdges = docData.edges;
        initialX = docData.x;
        initialY = docData.y;
        initialZoom = docData.zoom;
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

  return { initialQuestions, initialResults, initialEdges, initialX, initialY, initialZoom };
};

export default useGetDoc;
