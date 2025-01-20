import { ChangeEvent, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";

const FlowTitleInput = () => {
  const dispatch = useAppDispatch();
  const flowTitle = useAppSelector((state) => state.flow.flowTitle);
  const submitTitleError = useAppSelector((state) => state.flow.submitTitleError);

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setFlowTitle(e.currentTarget.value));
      dispatch(actions.setIsDirty(true));
    },
    [dispatch]
  );

  return (
    <div className="w-full flex flex-col pr-4">
      <div className="w-full flex justify-start items-center">
        <label
          className="w-2/12 block select-none text-base font-medium text-gray-300 h-9 leading-9 text-center"
          htmlFor="title"
        >
          Title
        </label>

        <div className="grow flex flex-col">
          <input
            id="title"
            type="text"
            value={flowTitle}
            onChange={handleChangeTitle}
            placeholder="タイトルを入力してください"
            className="bg-white border border-slate-400 text-gray-900 text-sm focus:ring-transparent focus:border-blue-400 block  p-2.5 h-9 placeholder-slate-400 rounded"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        {submitTitleError && (
          <div className="w-8/12">
            <div className="text-sm text-red-500 pt-1">{submitTitleError}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FlowTitleInput);

// import { ChangeEvent, memo, useCallback } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { actions } from "@/store/slice/flowSlice";

// const FlowTitleInput = () => {
//   const dispatch = useAppDispatch();
//   const flowTitle = useAppSelector((state) => state.flow.flowTitle);
//   const submitError = useAppSelector((state) => state.flow.submitError);

//   const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     dispatch(actions.setFlowTitle(e.currentTarget.value));
//     dispatch(actions.setIsDirty(true));
//   }, []);

//   return (
//     <div className="w-full flex justify-start items-center pr-4">

//       <label
//         htmlFor="title"
//         className="w-2/12 block select-none text-base font-medium text-gray-300 h-9 leading-9 text-center">
//         Title
//       </label>

//       <div className="grow flex flex-col">
//         <input
//           id="title"
//           type="text"
//           value={flowTitle}
//           onChange={handleChangeTitle}
//           placeholder="タイトルを入力してください"
//           className="bg-white border border-slate-400 text-gray-900 text-sm focus:ring-transparent focus:border-blue-400 block  p-2.5 h-9 placeholder-slate-400 rounded" />

//         {submitError?.title && (
//           <div className="text-sm text-red-500 pt-1">{submitError.title}</div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default memo(FlowTitleInput);
