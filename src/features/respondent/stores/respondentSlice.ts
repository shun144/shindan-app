import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RespondentState } from "@/store/types";
import { AnswerHistoryType, RespondentItem } from "@/features/respondent/types";

const initCurrItemValue: RespondentItem = {
  id: "",
  topic: "",
  choices: [],
  category: "none",
};

const initialState: RespondentState = {
  isLoading: true,
  currItem: initCurrItemValue,
  items: [],
  answerHistories: [],
  firstQuestionId: "",
};

const respondentSlice = createSlice({
  name: "respondent",
  initialState,
  reducers: {
    setFirstQuestionId(state, { payload }: PayloadAction<string>) {
      state.firstQuestionId = payload;
    },
    setItems(state, { payload }: PayloadAction<RespondentItem[]>) {
      state.items = payload;
    },
    setCurrItem(state, { payload }: PayloadAction<string | undefined>) {
      state.currItem = state.items.find((x) => x.id === payload) ?? initCurrItemValue;
    },
    setAnswerHistories(state, { payload }: PayloadAction<AnswerHistoryType>) {
      state.answerHistories = [
        ...state.answerHistories,
        {
          id: payload.id,
          question: payload.question,
          answer: payload.answer,
        },
      ];
    },

    reset(state) {
      state.currItem = state.items.find((x) => x.id === state.firstQuestionId)!;
      state.answerHistories = [];
    },

    backStep(state) {
      const prev = state.answerHistories;
      state.currItem = state.items.find((x) => x.id === prev[prev.length - 1].id)!;
      state.answerHistories = prev.slice(0, -1);
    },
  },
});

export default respondentSlice.reducer;
export const actions = respondentSlice.actions;
