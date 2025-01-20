import { memo, Dispatch, SetStateAction, useCallback } from "react";
import { Modal } from "@/components";
import { BoardModalForm } from "@/features/board/components";
import useCreateFlow from "@/features/board/hooks/useCreateFlow";

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

const CreateModal = ({ isOpenModal, setIsOpenModal }: Props) => {
  const closeModal = useCallback(() => setIsOpenModal(false), [setIsOpenModal]);

  const { register, handleSubmitForm, errors } = useCreateFlow(closeModal);
  return (
    <Modal show={isOpenModal} onClose={closeModal}>
      <BoardModalForm
        buttonLabel="作 成"
        register={register}
        handleSubmitForm={handleSubmitForm}
        errors={errors}
      />
    </Modal>
  );
};

export default memo(CreateModal);

// import { memo, Dispatch, SetStateAction } from "react";
// import { titleMaxLength, urlMaxLength } from "@/constants/inputLength";
// import { useForm } from "react-hook-form";
// import { createFlow, CreateFLowArgs } from "@/db/functions/flow";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { FlowType } from "@/types";
// import { checkDummyAuthStatus } from "@/utils/userUtils";
// import { InlineInputWithError, Modal, Button } from "@/components";

// type Props = {
//   isOpenModal: boolean;
//   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
// };

// const CreateModal = ({ isOpenModal, setIsOpenModal }: Props) => {
//   const { userId } = checkDummyAuthStatus();

//   const {
//     register,
//     handleSubmit,
//     formState: { isDirty, isValid, errors },
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       title: "",
//       url: "",
//     },
//   });

//   const queryClient = useQueryClient();
//   const createFlowMutation = useMutation<FlowType, Error, CreateFLowArgs>({
//     mutationFn: (data) => createFlow(data),
//     onSuccess: (flow) => {
//       setIsOpenModal(false);
//       queryClient.setQueryData(["flows", userId], (oldFlows: FlowType[]) => {
//         return [...oldFlows, flow];
//       });
//     },
//   });

//   const closeModal = () => setIsOpenModal(false);

//   const onSubmit = (data: { title: string; url: string }) => {
//     createFlowMutation.mutate({
//       userId: userId!,
//       title: data.title,
//       url: data.url,
//     });
//   };

//   return (
//     <Modal show={isOpenModal} onClose={closeModal}>
//       <div className="flex justify-center items-center my-16 w-full">
//         <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
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

//           <InlineInputWithError
//             id="url"
//             label="URL"
//             register={register("url", {
//               required: "URLは必須です",
//               maxLength: {
//                 value: urlMaxLength,
//                 message: `タイトルは${urlMaxLength}文字以内で入力してください`,
//               },
//               pattern: {
//                 value: /^[0-9a-zA-Z]+$/,
//                 message: "URLは半角英数字で入力してください",
//               },
//             })}
//             maxLength={urlMaxLength}
//             error={errors.url?.message}
//           />

//           <div className="mt-3 flex justify-end">
//             <Button type="submit" disabled={!isDirty || !isValid}>
//               作 成
//             </Button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default memo(CreateModal);
