import { memo } from "react";
import { Header, Footer } from "@/features/respondent/layouts";
import { IoArrowBack } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { actions as respondentActions } from "@/features/respondent/stores/respondentSlice";

const NotFinished = () => {
  const dispatch = useAppDispatch();
  const answerHistories = useAppSelector((state) => state.respondent.answerHistories);

  const handleBackStep = () => {
    dispatch(respondentActions.backStep());
  };

  return (
    <>
      <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
        <Header />

        <div className=" bg-slate-100 grow h-full w-full">
          <div className="h-full w-full flex justify-center items-start">
            <div className="pt-12 w-9/12 md:pt-24 md:w-5/12">
              <div className="flex items-end gap-x-3">
                <span className="text-3xl font-bold text-slate-600 md:text-4xl">
                  このアンケートはここで終了しています。
                </span>
              </div>
              <div className="pt-6 text-xl text-slate-700 md:pt-12 md:text-3xl">
                <span>アンケートをやり直していただくか、管理者へご確認ください。</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex pt-4 md:pt-8">
          {answerHistories.length > 0 && (
            <div className="pt-4 flex justify-start items-start">
              <button
                onClick={handleBackStep}
                className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3"
              >
                <IoArrowBack className="text-sm md:text-xl" />
                <p>1つ前の質問に戻る</p>
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* <div className="h-full w-full flex flex-col justify-start items-center">
        <div className="pt-12 w-9/12 md:pt-24 md:w-5/12">
          <div className="w-full">
            <div className="flex items-end gap-x-3">
              <span className="text-2xl font-bold text-slate-600 md:text-3xl">
                このアンケートはここで終了しています。
              </span>
            </div>
            <div className="pt-6 text-xl text-slate-600 md:pt-6 md:text-3xl">
              アンケートをやり直していただくか、管理者へご確認ください。
            </div>
          </div>

          <div className="w-full flex pt-4 md:pt-8">
            {answerHistories.length > 0 && (
              <div className="pt-4 flex justify-start items-start">
                <button
                  onClick={handleBackStep}
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3"
                >
                  <IoArrowBack className="text-sm md:text-xl" />
                  <p>1つ前の質問に戻る</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default memo(NotFinished);

// import { memo } from "react";
// import { IoArrowBack } from "react-icons/io5";
// import { useAppSelector, useAppDispatch } from "@/store/store";
// import { actions as respondentActions } from "@/features/respondent/stores/respondentSlice";

// const NotFinished = () => {
//   const dispatch = useAppDispatch();
//   const answerHistories = useAppSelector((state) => state.respondent.answerHistories);

//   const handleBackStep = () => {
//     dispatch(respondentActions.backStep());
//   };

//   return (
//     <>
//       <div className="h-full w-full flex flex-col justify-start items-center">
//         <div className="pt-12 w-9/12 md:pt-24 md:w-5/12">
//           <div className="w-full">
//             <div className="flex items-end gap-x-3">
//               <span className="text-2xl font-bold text-slate-600 md:text-3xl">このアンケートはここで終了しています。</span>
//             </div>
//             <div className="pt-6 text-xl text-slate-600 md:pt-6 md:text-3xl">アンケートをやり直していただくか、管理者へご確認ください。</div>
//           </div>

//           <div className="w-full flex pt-4 md:pt-8">
//             {answerHistories.length > 0 && (
//               <div className="pt-4 flex justify-start items-start">
//                 <button onClick={handleBackStep} className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3">
//                   <IoArrowBack className="text-sm md:text-xl" />
//                   <p>1つ前の質問に戻る</p>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default memo(NotFinished);
