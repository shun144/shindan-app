import { deleteFlow, type DeleteFLowArgs } from "@/db/functions/flow";
import { type FlowType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteFlow = () => {
  const queryClient = useQueryClient();
  const deleteFlowMutation = useMutation<string, Error, DeleteFLowArgs>({
    mutationFn: ({ userId, flowId }) => deleteFlow({ userId, flowId }),
    onSuccess: (flowId) => {
      queryClient.setQueryData(["flows", "1"], (oldFlows: FlowType[]) => {
        return oldFlows.filter((flow) => flow.id !== flowId);
      });
    },
  });

  return { deleteFlowMutation };
};

export default useDeleteFlow;
