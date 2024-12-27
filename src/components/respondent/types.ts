export type QuestionType = {
  id: string;
  topic: string;
  choices: ChoiceType[];
  category: "question" | "result" | "none";
};

export type ResultType = {
  id: string;
  result: string;
  message?: string;
  img?: string;
  url?: string;
  category: "question" | "result" | "none";
};

type ChoiceType = {
  id: string;
  content: string;
  nextId?: string;
};

export type RespondentItem = QuestionType | ResultType;

export type AnswerHistoryType = {
  id: string;
  question: string;
  answer: string;
};
