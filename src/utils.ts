/**
 * 疑似的な認証チェック
 * localStorageにUserIdが格納されているかどうかチェック
 * @returns 
 */
export const checkDummyAuthStatus = () => {
  const userId = localStorage.getItem("userId");
  return userId;
}

export const hasProperty = <K extends string>(x: unknown, ...name: K[]): x is { [M in K]: unknown } => {
  return (
    x instanceof Object && name.every(prop => prop in x)
  )
}



function hasProperty2<K extends string>(
  x: unknown,
  ...name: K[]
): x is { [M in K]: unknown } {
  return (
    x instanceof Object && name.every(prop => prop in x)
  );
}
