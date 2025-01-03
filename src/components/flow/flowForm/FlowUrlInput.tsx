import { ChangeEvent, memo, useCallback, MouseEvent, useState, useRef, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { Tooltip } from "react-tooltip";
import { MdContentCopy } from "react-icons/md";

const FlowUrlInput = () => {
  const dispatch = useAppDispatch();
  const shopName = useAppSelector((state) => state.user.shopName);
  const flowUrl = useAppSelector((state) => state.flow.flowUrl);

  const submitUrlError = useAppSelector((state) => state.flow.submitUrlError);
  const [showTooltip, setShowTooltip] = useState(false);
  const refUrl = useRef<HTMLInputElement | null>(null);

  const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);

  const handleChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setFlowUrl(e.currentTarget.value));
    dispatch(actions.setIsDirty(true));
  }, []);


  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!refUrl.current) return;

      const fullUrl = `${BASE_URL}/respondent/${shopName}/${flowUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // 2秒後に自動でツールチップを非表示
    } catch (error) {
      console.error("コピーに失敗しました:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">

      <div className="w-full flex justify-start items-center pr-4">
        <label
          className="w-2/12 block select-none  text-base font-medium text-gray-300 h-9 leading-9 text-center"
          htmlFor="url"
        >
          URL
        </label>

        <div className="w-9/12 flex flex-col">
          <input type="text"
            ref={refUrl}
            id="url"
            value={flowUrl}
            onChange={handleChangeUrl}
            required
            placeholder="URLを入力してください"
            className="w-full bg-white border border-slate-400 text-gray-900 text-sm focus:ring-transparent focus:border-blue-400 block  p-2.5 h-9 placeholder-slate-400 rounded"
          />
        </div>

        <button data-tooltip-id="custom-tooltip" data-tooltip-content="URLをコピーしました" onClick={handleCopy} className="w-1/12 p-2 relative text-indigo-400 rounded transition-all hover:text-indigo-100  hover:bg-indigo-700 duration-300">
          <MdContentCopy />
        </button>

        {showTooltip && (
          <Tooltip
            id="custom-tooltip"
            place="left"
            style={{
              background: "#6366f1",
              fontSize: "12px",
              padding: "4px 8px",
            }}
            openOnClick={true}
            isOpen={showTooltip}
          />
        )}
      </div>



      <div className="w-full flex justify-center items-center">
        {submitUrlError && (
          <div className="w-8/12">
            <div className="text-sm text-red-500 pt-1">{submitUrlError}</div>
          </div>
        )}
      </div>







    </div>
  );
};

export default memo(FlowUrlInput);
