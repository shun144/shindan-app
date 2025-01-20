import { createFlow, CreateFLowArgs } from "@/db/functions/flow";
import { FlowType } from "@/types";
import { checkDummyAuthStatus } from "@/utils/userUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const useCreateFlow = (closeModal: () => void) => {
  const { userId } = checkDummyAuthStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { title: "", url: "" },
  });

  const queryClient = useQueryClient();
  const createFlowMutation = useMutation<FlowType, Error, CreateFLowArgs>({
    mutationFn: (data) => createFlow(data),
    onSuccess: (flow) => {
      closeModal();
      queryClient.setQueryData(["flows", userId], (oldFlows: FlowType[]) => {
        return [...oldFlows, flow];
      });
    },
  });

  const onSubmit = (data: { title: string; url: string }) => {
    createFlowMutation.mutate({
      userId: userId!,
      title: data.title,
      url: data.url,
    });
  };

  return { register, handleSubmitForm: handleSubmit(onSubmit), errors };
};

export default useCreateFlow;

// import { createFlow, CreateFLowArgs } from "@/db/functions/flow";
// import { FlowType } from "@/types";
// import { checkDummyAuthStatus } from "@/utils/userUtils";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";

// interface Props {
//   initValues: {
//     title: string;
//     url: string;
//   };
//   closeModal: () => void;
// }

// const useCreateFlow = ({ initValues, closeModal }: Props) => {
//   const { userId } = checkDummyAuthStatus();

//   const {
//     register,
//     handleSubmit,
//     formState: { isDirty, isValid, errors },
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: initValues,
//   });

//   const queryClient = useQueryClient();
//   const createFlowMutation = useMutation<FlowType, Error, CreateFLowArgs>({
//     mutationFn: (data) => createFlow(data),
//     onSuccess: (flow) => {
//       closeModal();
//       queryClient.setQueryData(["flows", userId], (oldFlows: FlowType[]) => {
//         return [...oldFlows, flow];
//       });
//     },
//   });

//   const onSubmit = (data: { title: string; url: string }) => {
//     createFlowMutation.mutate({
//       userId: userId!,
//       title: data.title,
//       url: data.url,
//     });
//   };

//   return { register, handleSubmitForm: handleSubmit(onSubmit), errors };
// };

// export default useCreateFlow;
