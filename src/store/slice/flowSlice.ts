import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type FlowState, type FlowImage } from "@/store/types";

const initialState: FlowState = {
  flowId: undefined,
  flowTitle: "",
  flowUrl: "",
  firstNodeId: "",
  isDirty: false,
  qNodeNum: 0,
  rNodeNum: 0,
  isSidebarOpen: true,
  flowImages: [],
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
    setFirstNodeId(state, { payload }: PayloadAction<string>) {
      state.firstNodeId = payload;
    },
    setIsDirty(state, { payload }: PayloadAction<boolean>) {
      state.isDirty = payload;
    },
    addImage(state, { payload }: PayloadAction<FlowImage>) {
      state.flowImages = [...state.flowImages, payload];
    },
    delImage(state, { payload }: PayloadAction<string>) {
      state.flowImages = state.flowImages.filter((x) => x.nodeId !== payload);
    },
  },
});

export default flowSlice.reducer;
export const actions = flowSlice.actions;
// export const { add, minus } = flowSlice.actions;
