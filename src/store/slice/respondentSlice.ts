import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RespondentItem } from "@/components/respondent/types";
import { RespondentState } from "@/store/types";
import { AnswerHistoryType } from '@/components/respondent/types'

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
    setItems(state, { payload }: PayloadAction<RespondentItem[]>) {
      state.items = payload
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

    backStep(state) {
      state.currItem = state.items.find(x => x.id === state.answerHistories[state.answerHistories.length - 1].id)!;
      state.answerHistories = state.answerHistories.slice(0, -1);
    }
  },
});

export default respondentSlice.reducer;
export const actions = respondentSlice.actions;
