import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RespondentItem } from "@/components/respondent/types";
import { RespondentState } from "@/store/types";

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
    setCurrItem(state, { payload }: PayloadAction<string>) {
      state.currItem = state.items.find((x) => x.id === payload) ?? initCurrItemValue;
    },
    setAnswerHistories(state, { payload: { id, question, answer } }: PayloadAction<{ id: string; question: string; answer: string }>) {
      state.answerHistories = [
        ...state.answerHistories,
        {
          id,
          question,
          answer,
        },
      ];
    },
  },
});

export default respondentSlice.reducer;
export const actions = respondentSlice.actions;
