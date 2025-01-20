import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type UserState } from "@/store/types";
import { addUser } from "@/db/utils";

const getOrGenerateUserInfo = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo) {
    return JSON.parse(storedUserInfo);
  }

  const newUserInfo: UserState = {
    userId: "1",
    userName: "test",
    shopName: "SampleShop",
    email: "test@sample.com",
  };

  localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  addUser(newUserInfo);
  return newUserInfo;
};

const initialState: UserState = getOrGenerateUserInfo();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<UserState>) {
      return { ...state, ...payload };
    },
  },
});

export default userSlice.reducer;
export const actions = userSlice.actions;
