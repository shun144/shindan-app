import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions } from "@/store/slice/flowSlice";
import { toast } from "@/components/toast/MyToaster";
import * as yup from "yup";
import { checkIsDupUrl } from "@/db/functions/flow";
import { checkDummyAuthStatus } from "@/utils/userUtils";

const useFlowSubmitValidate = (flowId: string) => {
  const { firstNodeId, flowTitle, flowUrl } = useAppSelector((state) => ({
    firstNodeId: state.flow.firstNodeId,
    flowTitle: state.flow.flowTitle,
    flowUrl: state.flow.flowUrl,
  }));

  const userId = checkDummyAuthStatus() as string;

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    title: yup.string().max(50, "titleは50文字以内にしてください").required("タイトルは必須です"),
    url: yup
      .string()
      .max(15, "URLは15文字以内にしてください")
      .required("URLは必須です")
      .matches(/^[0-9a-zA-Z]+$/, "URLは半角英数字で入力してください"),
  });

  /**
   * タイトルとURLのバリデーションチェック
   */
  const validateTitleAndUrl = async () => {
    try {
      await schema.validate(
        {
          title: flowTitle,
          url: flowUrl,
        },
        { abortEarly: false }
      );

      // タイトルとURLのエラークリア
      dispatch(actions.clearSubmitError());
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          // 初回のエラーのみ取得
          // 例：未入力エラーと正規表現エラーが出た場合、未入力エラーのみ表示
          if (!(err.path! in validationErrors)) {
            validationErrors[err.path!] = err.message;
            switch (err.path!) {
              case "title":
                dispatch(actions.setSubmitTItleError(err.message));
                break;
              case "url":
                dispatch(actions.setSubmitUrlError(err.message));
                break;
              default:
                break;
            }
          }
        });

        // タイミングを少しずらしてエラートーストを表示
        for (const val of Object.values(validationErrors)) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          toast.error(val, { duration: 5000 });
        }
      }
      return false;
    }
  };

  /**
   * 1問目の質問存在チェック
   * @returns
   */
  const validateFirstNodeId = () => {
    if (!firstNodeId) {
      toast.error("1問目の質問を作成してください", { duration: 5000 });
      return false;
    }
    return true;
  };

  /**
   * URLの重複チェック
   * @returns
   */
  const validateDupFlowUrl = async (args: { userId: string; flowId: string; url: string }) => {
    if (await checkIsDupUrl(args)) {
      const errMsg = "このURLはすでに使用されています";
      toast.error(errMsg, { duration: 5000 });

      dispatch(actions.setSubmitUrlError(errMsg));
      return false;
    }
    return true;
  };

  /**
   * title/URL/firstNodeIdのバリデーションチェック
   * @returns
   */
  const checkIsValidateError = async () => {
    let isValidateError = false;

    if (!(await validateTitleAndUrl())) isValidateError = true;

    if (!validateFirstNodeId()) isValidateError = true;

    if (!(await validateDupFlowUrl({ userId, flowId, url: flowUrl }))) isValidateError = true;
    return isValidateError;
  };

  return { checkIsValidateError };
};

export default useFlowSubmitValidate;
