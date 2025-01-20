export interface FlowType {
  id: string;
  title: string;
  url: string;
  initFirstQuestionId: string;
  questions: string;
  results: string;
  edges: string;
  x: number;
  y: number;
  zoom: number;
}

// エラーの型定義
export type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};
