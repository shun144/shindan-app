import { memo, useEffect } from "react";
import { Modal } from "@/components";
import useUpdateFlow from "@/features/board/hooks/useUpdateFlow";
import { type BoardItemType } from "@/features/board/types";
import { BoardModalForm } from "@/features/board/components";

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
  boardItem: BoardItemType;
};

const EditModal = ({ isOpenModal, closeModal, boardItem }: Props) => {
  const { flowId, title, url } = boardItem;

  const { reset, register, handleSubmitForm, errors } = useUpdateFlow({
    closeModal,
    flowId: flowId!,
  });

  // モーダルを開く際にタイトルとURLを初期値として表示する
  useEffect(() => {
    if (isOpenModal) {
      reset({ title, url });
    }
  }, [isOpenModal, title, url, reset]);

  return (
    <Modal show={isOpenModal} onClose={closeModal}>
      <BoardModalForm
        buttonLabel="更 新"
        flowId={flowId}
        register={register}
        handleSubmitForm={handleSubmitForm}
        errors={errors}
        closeModal={closeModal}
      />
    </Modal>
  );
};

export default memo(EditModal);

// import { memo, Dispatch, SetStateAction, useCallback, useEffect } from "react";
// import { Button, InlineInputWithError, Modal } from "@/components";
// import { BoardModalForm } from "@/features/board/components";
// import useUpdateFlow from "@/features/board/hooks/useUpdateFlow";
// import { type BoardItemType } from "@/features/board/types";
// import { titleMaxLength, urlMaxLength } from "@/constants/inputLength";
// import {
//   checkIsDupUrl,
//   updateTitleUrl,
//   UpdateTitleUrlArgs,
//   UpdateTitleUrlRtns,
// } from "@/db/functions/flow";
// import { checkDummyAuthStatus } from "@/utils/userUtils";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { FlowType } from "@/types";

// type Props = {
//   isOpenModal: boolean;
//   closeModal: () => void;
//   boardItem: BoardItemType;
// };

// const EditModal = ({ isOpenModal, closeModal, boardItem }: Props) => {
//   const { flowId, title, url } = boardItem;
//   const { userId } = checkDummyAuthStatus();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       title: "",
//       url: "",
//     },
//   });

//   useEffect(() => {
//     if (isOpenModal) {
//       reset({ title, url });
//     }
//   }, [isOpenModal, title, reset]);

//   const queryClient = useQueryClient();
//   const updateTitleUrlMutation = useMutation<UpdateTitleUrlRtns, Error, UpdateTitleUrlArgs>({
//     mutationFn: (payload) => updateTitleUrl(payload),
//     onSuccess: (data) => {
//       closeModal();
//       queryClient.setQueryData(["flows", userId], (oldFlows: FlowType[]) => {
//         return oldFlows.map((x) => {
//           if (x.id === data.flowId) {
//             return {
//               ...x,
//               title: data.title,
//               url: data.url,
//             };
//           } else {
//             return x;
//           }
//         });
//       });
//     },
//   });

//   const onSubmit = (data: { title: string; url: string }) => {
//     updateTitleUrlMutation.mutate({
//       userId: userId!,
//       flowId: flowId!,
//       title: data.title,
//       url: data.url,
//     });
//   };

//   return (
//     <Modal show={isOpenModal} onClose={closeModal}>
//       <div className="flex justify-center items-center my-16 w-full">
//         <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
//           {/* タイトルフォーム */}
//           <InlineInputWithError
//             id="title"
//             label="タイトル"
//             register={register("title", {
//               required: "タイトルは必須です",
//               maxLength: {
//                 value: titleMaxLength,
//                 message: `タイトルは${titleMaxLength}文字以内で入力してください`,
//               },
//             })}
//             maxLength={titleMaxLength}
//             error={errors.title?.message}
//           />

//           {/* URLフォーム */}
//           <InlineInputWithError
//             id="url"
//             label="URL"
//             register={register("url", {
//               required: "URLは必須です",
//               maxLength: {
//                 value: urlMaxLength,
//                 message: `URLは${urlMaxLength}文字以内で入力してください`,
//               },
//               pattern: {
//                 value: /^[0-9a-zA-Z]+$/,
//                 message: "URLは半角英数字で入力してください",
//               },
//               validate: async (value) => {
//                 const isDuplicate = await checkIsDupUrl({
//                   userId: userId!,
//                   flowId,
//                   url: value,
//                 });
//                 return !isDuplicate || "このURLはすでに使用されています";
//               },
//             })}
//             maxLength={urlMaxLength}
//             error={errors.url?.message}
//           />

//           {/* submitボタン */}
//           <div className="mt-3 flex justify-end">
//             <Button type="submit">更 新</Button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default memo(EditModal);
