// export interface Flow {
//   id: number;
//   title: string;
//   url: string;
//   firstQuestionId: string;
// }

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
