export interface FlowFiles {
  // [id: string]: File | null;
  [id: string]: File;
}

export interface Choice {
  id: string;
  content: string;
}

export type QuestionNodeType = {
  id: string;
  topic: string;
  img?: string;
  choices: Choice[];
};

export type ResultNodeType = {
  id: string;
  result: string;
  message?: string;
  img?: string;
  url?: string;
};

export type NodeType = "qNode" | "rNode";
