
import { QueryClient } from "@tanstack/react-query";
export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // コンポーネントにフォーカスが当たるとフェッチが作動してしまうのを無効
      refetchOnWindowFocus: false,

      // staleTimeのデフォルト値
      staleTime: 5000,
    },
  },
});