import { memo } from "react";
import { userNameMaxLength, shopNameMaxLength, emailMaxLength } from "@/constants/inputLength";
import { Button, InlineInputWithError } from "@/components";
import { useForm } from "react-hook-form";
import { checkDummyAuthStatus } from "@/utils/userUtils";

const ProfileRoute = () => {
  const { userName, shopName, email } = checkDummyAuthStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      userName,
      shopName,
      email,
    },
  });

  const onSubmit = (data: { userName: string; shopName: string; email: string }) => {
    console.log(data);
    // updateTitleUrlMutation.mutate({
    //   userId: userId!
    //   title: data.title,
    //   url: data.url,
    // });
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-10/12 h-full pt-24">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* ユーザ名フォーム */}
            <InlineInputWithError
              id="userName"
              label="ユーザ名"
              register={register("userName", {
                required: "ユーザ名は必須です",
                maxLength: {
                  value: userNameMaxLength,
                  message: `ユーザ名は${userNameMaxLength}文字以内で入力してください`,
                },
              })}
              maxLength={userNameMaxLength}
              error={errors.userName?.message}
            />

            {/* 店舗名フォーム */}
            <InlineInputWithError
              id="shopName"
              label="店舗名"
              register={register("shopName", {
                required: "店舗名は必須です",
                maxLength: {
                  value: shopNameMaxLength,
                  message: `店舗名は${shopNameMaxLength}文字以内で入力してください`,
                },
              })}
              maxLength={shopNameMaxLength}
              error={errors.shopName?.message}
            />

            {/* メールアドレスフォーム */}
            <InlineInputWithError
              id="email"
              label="メールアドレス"
              register={register("email", {
                required: "メールアドレスは必須です",
                maxLength: {
                  value: emailMaxLength,
                  message: `メールアドレスは${emailMaxLength}文字以内で入力してください`,
                },
              })}
              maxLength={emailMaxLength}
              error={errors.email?.message}
            />

            {/* submitボタン */}
            <div className="mt-3 flex justify-end">
              <Button type="submit">更 新</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileRoute);

// import { memo, useRef } from "react";
// import InputLabel from "@/components/input/InputLabel";
// import TextInput from "@/components/input/TextInput";
// import InputError from "@/components/input/InputError";
// import { userNameMaxLength, shopNameMaxLength, mailMaxLength } from "@/constants/inputLength";

// const Profile = () => {
//   const refUserName = useRef(null);
//   const refShopName = useRef(null);
//   const refMailName = useRef(null);

//   const handleSubmit = () => {};

//   return (
//     <>
//       <div className="w-full flex justify-center items-center">
//         <div className="w-10/12">
//           <form onSubmit={handleSubmit} className="mt-6 space-y-6">
//             <div>
//               <InputLabel htmlFor="name" value={`ユーザ名（${userNameMaxLength}文字）`} />
//               <TextInput
//                 id="name"
//                 ref={refUserName}
//                 className="mt-1 block w-full"
//                 required
//                 isFocused
//                 autoComplete="name"
//                 maxLength={userNameMaxLength}
//               />
//               {/* <InputError className="mt-2" message={errors.name} /> */}
//             </div>

//             {/* 店舗名 */}
//             <div>
//               <InputLabel htmlFor="shop_name" value={`店舗名（${shopNameMaxLength}文字）`} />
//               <TextInput
//                 id="shop_name"
//                 ref={refShopName}
//                 className="mt-1 block w-full"
//                 required
//                 isFocused
//                 autoComplete="english_name"
//                 maxLength={shopNameMaxLength}
//               />
//               {/* <InputError className="mt-2" message={errors.english_name} /> */}
//             </div>

//             <div>
//               <InputLabel htmlFor="email" value={`メールアドレス（${mailMaxLength}文字）`} />
//               <TextInput
//                 id="email"
//                 type="email"
//                 ref={refMailName}
//                 className="mt-1 block w-full"
//                 required
//                 autoComplete="username"
//                 maxLength={mailMaxLength}
//               />
//               {/* <InputError className="mt-2" message={errors.email} /> */}
//             </div>

//             {/* <div className="flex items-center gap-4">
//             <PrimaryButton disabled={processing}>保存</PrimaryButton>

//             <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
//               <p className="text-sm text-gray-600">保存完了</p>
//             </Transition>
//           </div> */}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default memo(Profile);
