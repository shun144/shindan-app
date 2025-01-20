import { InlineInputWithError, Button } from "@/components";
import { titleMaxLength, urlMaxLength } from "@/constants/inputLength";
import { checkIsDupUrl } from "@/db/functions/flow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { type BoardItemType } from "@/features/board/types";
import { checkDummyAuthStatus } from "@/utils/userUtils";

type Props = {
  buttonLabel: string;
  flowId?: string;
  register: UseFormRegister<BoardItemType>;
  handleSubmitForm: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<BoardItemType>;
  closeModal?: () => void;
};

const BoardModalForm = ({
  buttonLabel,
  flowId,
  register,
  handleSubmitForm,
  errors,
  closeModal,
}: Props) => {
  const { userId } = checkDummyAuthStatus();

  return (
    <div className="flex justify-center items-center my-16 w-full">
      <form className="w-full max-w-lg" onSubmit={handleSubmitForm}>
        {/* タイトルフォーム */}
        <InlineInputWithError
          id="title"
          label="タイトル"
          register={register("title", {
            required: "タイトルは必須です",
            maxLength: {
              value: titleMaxLength,
              message: `タイトルは${titleMaxLength}文字以内で入力してください`,
            },
          })}
          maxLength={titleMaxLength}
          error={errors.title?.message}
        />

        {/* URLフォーム */}
        <InlineInputWithError
          id="url"
          label="URL"
          register={register("url", {
            required: "URLは必須です",
            maxLength: {
              value: urlMaxLength,
              message: `URLは${urlMaxLength}文字以内で入力してください`,
            },
            pattern: {
              value: /^[0-9a-zA-Z]+$/,
              message: "URLは半角英数字で入力してください",
            },
            validate: async (value) => {
              const isDuplicate = await checkIsDupUrl({
                userId: userId!,
                flowId,
                url: value,
              });
              return !isDuplicate || "このURLはすでに使用されています";
            },
          })}
          maxLength={urlMaxLength}
          error={errors.url?.message}
        />

        {/* submitボタン */}
        <div className="mt-3 flex justify-end">
          {closeModal && (
            <Button
              type="button"
              buttonProps={{ variant: "cancel" }}
              className="mr-6"
              onClick={() => closeModal()}
            >
              キャンセル
            </Button>
          )}

          <Button type="submit">{buttonLabel}</Button>
        </div>
      </form>
    </div>
  );
};

export default BoardModalForm;
