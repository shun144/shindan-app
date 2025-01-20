import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type FlowState } from "@/store/types";

const initialState: FlowState = {
  flowId: undefined,
  flowTitle: "",
  flowUrl: "",
  firstNodeId: "",
  isDirty: false,
  qNodeNum: 0,
  rNodeNum: 0,
  isSidebarOpen: true,
  // flowImages: [],
  // submitError: null,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setFlowId(state, { payload }: PayloadAction<number>) {
      state.flowId = payload;
    },
    setFlowTitle(state, { payload }: PayloadAction<string>) {
      state.flowTitle = payload;
    },
    setFirstNodeId(state, { payload }: PayloadAction<string>) {
      state.firstNodeId = payload;
    },
    setFlowUrl(state, { payload }: PayloadAction<string>) {
      state.flowUrl = payload;
    },
    setQnodeNum(state, { payload }: PayloadAction<number>) {
      state.qNodeNum = payload;
    },
    addQnodeNum(state, { payload }: PayloadAction<number>) {
      state.qNodeNum += payload;
    },
    setRnodeNum(state, { payload }: PayloadAction<number>) {
      state.rNodeNum = payload;
    },
    addRnodeNum(state, { payload }: PayloadAction<number>) {
      state.rNodeNum += payload;
    },

    setIsDirty(state, { payload }: PayloadAction<boolean>) {
      state.isDirty = payload;
    },
    // addImage(state, { payload }: PayloadAction<FlowImage>) {
    //   state.flowImages = [...state.flowImages, payload];
    // },
    // delImage(state, { payload }: PayloadAction<string>) {
    //   state.flowImages = state.flowImages.filter((x) => x.nodeId !== payload);
    // },
    setSubmitTItleError(state, { payload }: PayloadAction<string | undefined>) {
      state.submitTitleError = payload;
    },
    setSubmitUrlError(state, { payload }: PayloadAction<string | undefined>) {
      state.submitUrlError = payload;
    },
    clearSubmitError(state) {
      state.submitTitleError = undefined;
      state.submitUrlError = undefined;
    },
    // clearSubmitError(state) {
    //   state.submitError = null
    // },
    // setSubmitError(state, { payload }: PayloadAction<SubmitError>) {
    //   if (payload === null) {
    //     state.submitError = payload
    //   }
    //   state.submitError = { ...state.submitError, ...payload }
    // }
  },
});

export default flowSlice.reducer;
export const actions = flowSlice.actions;
// export const { add, minus } = flowSlice.actions;
