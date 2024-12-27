import { memo, useRef } from "react";
import InputLabel from "@/parts/Input/InputLabel";
import TextInput from "@/parts/Input/TextInput";
import InputError from "@/parts/Input/InputError";
import { userNameMaxLength, shopNameMaxLength, mailMaxLength } from "@/constants";

const Profile = () => {
  const refUserName = useRef(null);
  const refShopName = useRef(null);
  const refMailName = useRef(null);

  const handleSubmit = () => {};

  return (
    <>
      <div className="">
        <header>
          <p className="mt-1 text-sm text-gray-600">ユーザ情報やメールアドレスを更新します</p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <InputLabel htmlFor="name" value={`ユーザ名（${userNameMaxLength}文字）`} />
            <TextInput id="name" ref={refUserName} className="mt-1 block w-full" required isFocused autoComplete="name" maxLength={userNameMaxLength} />
            {/* <InputError className="mt-2" message={errors.name} /> */}
          </div>

          {/* 店舗名 */}
          <div>
            <InputLabel htmlFor="shop_name" value={`店舗名（${shopNameMaxLength}文字）`} />
            <TextInput id="shop_name" ref={refShopName} className="mt-1 block w-full" required isFocused autoComplete="english_name" maxLength={shopNameMaxLength} />
            {/* <InputError className="mt-2" message={errors.english_name} /> */}
          </div>

          <div>
            <InputLabel htmlFor="email" value={`メールアドレス（${mailMaxLength}文字）`} />
            <TextInput id="email" type="email" ref={refMailName} className="mt-1 block w-full" required autoComplete="username" maxLength={mailMaxLength} />
            {/* <InputError className="mt-2" message={errors.email} /> */}
          </div>

          {/* <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing}>保存</PrimaryButton>

            <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
              <p className="text-sm text-gray-600">保存完了</p>
            </Transition>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default memo(Profile);
