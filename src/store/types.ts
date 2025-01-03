import { RespondentItem, AnswerHistoryType } from "@/components/respondent/types";

export interface FlowImage {
  nodeId: string;
  file: File;
}

export type SubmitError = {
  title?: string,
  url?: string,
} | null;


export interface FlowState {
  flowId?: number;
  flowTitle: string;
  flowUrl: string;
  firstNodeId: string;
  isDirty: boolean;
  qNodeNum: number;
  rNodeNum: number;
  isSidebarOpen: boolean;
  flowImages: FlowImage[];
  // submitError: SubmitError | null,
  submitTitleError?: string;
  submitUrlError?: string;
  //   submitError: SubmitError;
  //   flowImages: FlowImage[];
}

export interface RespondentState {
  isLoading: boolean;
  currItem: RespondentItem;
  items: RespondentItem[];
  answerHistories: AnswerHistoryType[];
  firstQuestionId: string;
}

export interface UserState {
  userId: string;
  userName: string;
  mail: string;
  shopName: string;
}


