import { type UserState } from "@/store/types";
/**
 * 疑似的な認証チェック
 * localStorageにUserIdが格納されているかどうかチェック
 * @returns
 */
export const checkDummyAuthStatus = (): UserState => {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);

    return userInfo;
    // console.log(userInfo);
    // return userInfo.userId as string;
  }
  return {
    userId: "",
    userName: "",
    email: "",
    shopName: "",
  };
};

export const hasProperty = <K extends string>(
  x: unknown,
  ...name: K[]
): x is { [M in K]: unknown } => {
  return x instanceof Object && name.every((prop) => prop in x);
};

function hasProperty2<K extends string>(x: unknown, ...name: K[]): x is { [M in K]: unknown } {
  return x instanceof Object && name.every((prop) => prop in x);
}
