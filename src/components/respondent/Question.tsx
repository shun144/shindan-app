import { memo, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions as respondentActions } from "@/store/slice/respondentSlice";
import { motion } from "framer-motion";
import { QuestionType } from "@/components/respondent/types";

const Question = () => {
  const dispatch = useAppDispatch();
  const currItem = useAppSelector((state) => state.respondent.currItem) as QuestionType;
  const answerHistories = useAppSelector((state) => state.respondent.answerHistories);


  //   const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie) as QuestionType;
  //   const setCurrentQuestionnarie = useRespondentStore((state) => state.setCurrentQuestionnarie);
  //   const setAnswerHistories = useRespondentStore((state) => state.setAnswerHistories);
  //   const answerHistories = useRespondentStore((state) => state.answerHistories);
  //   const backStep = useRespondentStore((state) => state.backStep);

  const handleClickAnswer = (currQ: QuestionType, answer: string, nextId?: string) => {
    dispatch(
      respondentActions.setAnswerHistories({
        id: currQ.id,
        question: currQ.topic,
        answer,
      })
    );

    dispatch(respondentActions.setCurrItem(nextId));

    // setAnswerHistories(currentQuestion.id, currentQuestion.topic, answer);
    // setCurrentQuestionnarie(nextId);
    setIsForwardLeft(true);
  };

  const handleClickBack = () => {
    dispatch(respondentActions.backStep());
    setIsForwardLeft(false);
  };

  const [isForwardLeft, setIsForwardLeft] = useState(true);

  const slideVariants = {
    hidden: { x: isForwardLeft ? 300 : -300, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          type: "spring",
          stiffness: 80,
          damping: 13,
          restDelta: 0.01,
        },
        opacity: {
          delay: 0.1,
          duration: 0.5,
        },
      },
    },
  };

  return (
    <div className="h-full w-full flex flex-col justify-start items-center pt-10 pb-6 md:py-12">
      <motion.div className="w-full px-2 md:w-6/12" key={currItem.id} variants={slideVariants} initial="hidden" animate="show">
        <div className="rounded-2xl shadow-md">
          <div className="rounded-t-2xl bg-gradient-to-br from-purple-400 via-violet-400 to-blue-200 text-white flex justify-center items-center px-3 py-3 md:px-5 md:py-4">
            <div className="w-full text-start break-all text-base md:text-3xl">{currItem.topic}</div>
          </div>

          <div className="bg-white rounded-b-2xl py-1 md:py-4">
            <div className="flex flex-col justify-center items-center gap-y-4 py-4 mb:gap-y-7 mb:py-8">
              {currItem.choices.map(({ id, content, nextId }, idx) => (
                <button key={id} className="w-11/12 border-4 border-gray-300 flex justify-center items-center rounded-full hover:opacity-40 transiton-all duration-300  min-h-16 h-16 max-h-16 md:min-h-24 md:h-24 md:max-h-24" onClick={() => handleClickAnswer(currItem, content, nextId)}>
                  <div className="w-2/12 md:w-1/12 md:pl-4">
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center rounded-full  bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400  w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
                        <div className="rounded-full flex justify-center items-center bg-white w-[24px] h-[24px] md:w-[34px] md:h-[34px]">
                          <p className="bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent font-bold text-xl md:text-3xl">{String.fromCharCode(idx + 65)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-10/12 md:w-11/12">
                    <div className="md:px-3">
                      <div className="break-all text-left pr-3 text-sm md:text-2xl ">{content}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {answerHistories.length > 0 && (
          <div className="pt-4 flex justify-start items-start">
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3" onClick={handleClickBack}>
              <IoArrowBack className="text-sm md:text-xl" />
              <p>1つ前の質問に戻る</p>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default memo(Question);



// import { memo, useState } from "react";
// import { IoArrowBack } from "react-icons/io5";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { actions as respondentActions } from "@/store/slice/respondentSlice";
// import { motion } from "framer-motion";
// import { QuestionType } from "@/components/respondent/types";

// const Question = () => {
//   const dispatch = useAppDispatch();
//   const currItem = useAppSelector((state) => state.respondent.currItem) as QuestionType;

//   //   const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie) as QuestionType;
//   //   const setCurrentQuestionnarie = useRespondentStore((state) => state.setCurrentQuestionnarie);
//   //   const setAnswerHistories = useRespondentStore((state) => state.setAnswerHistories);
//   //   const answerHistories = useRespondentStore((state) => state.answerHistories);
//   //   const backStep = useRespondentStore((state) => state.backStep);

//   const handleClickAnswer = (currQ: QuestionType, answer: string, nextId?: string) => {
//     dispatch(
//       respondentActions.setAnswerHistories({
//         id: currQ.id,
//         question: currQ.topic,
//         answer,
//       })
//     );

//     dispatch(respondentActions.setCurrItem(nextId));

//     // setAnswerHistories(currentQuestion.id, currentQuestion.topic, answer);
//     // setCurrentQuestionnarie(nextId);
//     setIsForwardLeft(true);
//   };

//   const handleClickBack = () => {
//     backStep();
//     setIsForwardLeft(false);
//   };

//   const [isForwardLeft, setIsForwardLeft] = useState(true);

//   const slideVariants = {
//     hidden: { x: isForwardLeft ? 300 : -300, opacity: 0 },
//     show: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         x: {
//           type: "spring",
//           stiffness: 80,
//           damping: 13,
//           restDelta: 0.01,
//         },
//         opacity: {
//           delay: 0.1,
//           duration: 0.5,
//         },
//       },
//     },
//   };

//   return (
//     <div className="h-full w-full flex flex-col justify-start items-center pt-10 pb-6 md:py-12">
//       <motion.div className="w-full px-2 md:w-6/12" key={currItem.id} variants={slideVariants} initial="hidden" animate="show">
//         <div className="rounded-2xl shadow-md">
//           <div className="rounded-t-2xl bg-gradient-to-br from-purple-400 via-violet-400 to-blue-200 text-white flex justify-center items-center px-3 py-3 md:px-5 md:py-4">
//             <div className="w-full text-start break-all text-base md:text-3xl">{currItem.topic}</div>
//           </div>

//           <div className="bg-white rounded-b-2xl py-1 md:py-4">
//             <div className="flex flex-col justify-center items-center gap-y-4 py-4 mb:gap-y-7 mb:py-8">
//               {currItem.choices.map(({ id, content, nextId }, idx) => (
//                 <button key={id} className="w-11/12 border-4 border-gray-300 flex justify-center items-center rounded-full hover:opacity-40 transiton-all duration-300  min-h-16 h-16 max-h-16 md:min-h-24 md:h-24 md:max-h-24" onClick={() => handleClickAnswer(currentQuestionnarie, content, nextId)}>
//                   <div className="w-2/12 md:w-1/12 md:pl-4">
//                     <div className="flex justify-center items-center">
//                       <div className="flex justify-center items-center rounded-full  bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400  w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
//                         <div className="rounded-full flex justify-center items-center bg-white w-[24px] h-[24px] md:w-[34px] md:h-[34px]">
//                           <p className="bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent font-bold text-xl md:text-3xl">{String.fromCharCode(idx + 65)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-10/12 md:w-11/12">
//                     <div className="md:px-3">
//                       <div className="break-all text-left pr-3 text-sm md:text-2xl ">{content}</div>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {answerHistories.length > 0 && (
//           <div className="pt-4 flex justify-start items-start">
//             <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3" onClick={handleClickBack}>
//               <IoArrowBack className="text-sm md:text-xl" />
//               <p>1つ前の質問に戻る</p>
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default memo(Question);
