import { memo, useEffect } from "react";
import { ResultType } from "@/features/respondent/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions as respondentActions } from "@/features/respondent/stores/respondentSlice";
import { MdOutlineRestartAlt } from "react-icons/md";
import ResultBg from "./ResultBg";
import { useCheckOverHight } from "@/features/respondent/hooks";
import { motion, useAnimation } from "framer-motion";
import { countUpAnswerHistory } from "@/db/functions/answerHistory";
import { useParams } from "react-router-dom";

const Result = () => {
  const { shopName, flowUrl } = useParams();
  const dispatch = useAppDispatch();
  const currItem = useAppSelector((state) => state.respondent.currItem) as ResultType;

  const { refCheckOverHeight: refResult, isOverHeight: isResultOverHeight } = useCheckOverHight();
  const { refCheckOverHeight: refMsg, isOverHeight: isMsgOverHeight } = useCheckOverHight();

  useEffect(() => {
    const result = currItem.result;

    const answerHistory = {
      shopName: shopName!,
      url: flowUrl!,
      answer: result,
    };
    countUpAnswerHistory(answerHistory);
  }, []);

  const ctrl1 = useAnimation();
  const ctrl2 = useAnimation();
  const ctrl3 = useAnimation();

  const hopVariants = {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        type: "spring", // スプリングアニメーションを使用
        stiffness: 30, // 硬さを減らして速度を遅くする
        damping: 15, // 振動を抑えてスムーズに
        restDelta: 0.5,
        delay: 0.1,
      },
      opacity: { delay: 0.1, duration: 1.2 },
    },
  };

  useEffect(() => {
    (async () => {
      // 各要素のアニメーションの開始タイミングを少しずらす
      ctrl1.start(hopVariants);
      await new Promise((resolve) => setTimeout(resolve, 100));
      ctrl2.start(hopVariants);
      await new Promise((resolve) => setTimeout(resolve, 100));
      ctrl3.start(hopVariants);
    })();
  }, [ctrl1, ctrl2, ctrl3]);

  const handleClickReset = () => {
    dispatch(respondentActions.reset());
  };

  return (
    <div className="h-full max-h-full w-full flex justify-center items-center overflow-hidden relative">
      <ResultBg />

      <div className="md:w-6/12 w-11/12 h-full flex flex-col justify-center items-center gap-y-4">
        <motion.div initial={{ y: 300, opacity: 0 }} animate={ctrl1} className="w-full text-center flex justify-center items-center z-50">
          <div className="md:text-4xl text-xl text-violet-400/80 font-bold  select-none ">診 断 結 果</div>
        </motion.div>

        <motion.div initial={{ y: 300, opacity: 0 }} animate={ctrl2} className="w-full bg-white/40 rounded-lg shadow-sm backdrop-blur-[4px] flex flex-col justify-center items-center px-6">
          <div ref={refResult} className={`w-full sm:max-h-96 max-h-48 overflow-y-auto mt-3 md:mt-6 flex flex-col ${isResultOverHeight ? "items-start" : "items-center"}`}>
            <div className="whitespace-pre-wrap w-full text-base md:text-3xl min-h-12 text-slate-700 font-semibold flex justify-center break-all">{currItem.result}</div>

            {currItem.img && <img className="sm:h-full h-2/3 object-contain rounded-2xl shadow-lg" src={currItem.img} alt="アップロード画像" />}
          </div>

          <div className="w-full border-b-2 border-violet-600/20 my-3 md:my-6" />

          <div className={`w-full overflow-y-auto mb-3 md:mb-6 flex ${isMsgOverHeight ? "items-start" : "items-center"}`} ref={refMsg}>
            <div className="whitespace-pre-wrap w-full text-base md:text-2xl min-h-20 text-slate-600 font-normal flex justify-center break-all">{currItem.message}</div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 300, opacity: 0 }} animate={ctrl3} className="w-full flex justify-center items-center z-50 mt-2">
          <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200 text-sm py-2 px-2 md:text-xl md:px-3 z-50" onClick={handleClickReset}>
            <MdOutlineRestartAlt className="text-lg md:text-2xl" />
            <p>もう一度最初から始める</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
export default memo(Result);
