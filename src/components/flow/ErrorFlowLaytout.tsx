import { useRouteError, Navigate } from "react-router-dom";
import { RouteError } from '@/types'


const ErrorFlowLaytout = () => {
  const error = useRouteError() as RouteError;

  if (error.status === 401) {

    // Navigate：プログラム的にルートを変更（リダイレクト）するためのコンポーネント
    // replace={true}:現在の履歴エントリをリダイレクト先で置き換える（戻るボタンを押した時にリダイレクト前のページに戻れなくなる。（省略した時はreplace={false）
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <p>{error.message}</p>
    </div>
  )
}

export default ErrorFlowLaytout