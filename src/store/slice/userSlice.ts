import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type UserState } from "@/store/types";

const initialState: UserState = {
  userId: "1",
  userName: "test",
  shopName: "SampleShop",
  mail: "test@sample.com",
};

const userSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserState>) {
      return { ...state, ...payload };
    },

    setUserId(state, { payload }: PayloadAction<string>) {
      state.userId = payload;
    },
    setUserName(state, { payload }: PayloadAction<string>) {
      state.userName = payload;
    },
    setMail(state, { payload }: PayloadAction<string>) {
      state.mail = payload;
    },
    setShopName(state, { payload }: PayloadAction<string>) {
      state.shopName = payload;
    },
  },
});

export default userSlice.reducer;
export const actions = userSlice.actions;
