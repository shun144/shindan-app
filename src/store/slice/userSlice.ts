import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type UserState } from "@/store/types";


const getOrGenerateUserID = () => {
  const storedUserID = localStorage.getItem('userId');

  if (storedUserID) {
    return storedUserID;
  }

  // const newUserID = `user-${Math.random().toString(36).substr(2, 9)}`;
  const newUserId = "1";
  localStorage.setItem('userId', newUserId);
  return newUserId;
};


const initialState: UserState = {
  userId: getOrGenerateUserID(),
  userName: "test",
  shopName: "SampleShop",
  mail: "test@sample.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserState>) {
      return { ...state, ...payload };
    },

    setUserId(state, { payload }: PayloadAction<string>) {
      state.userId = payload;
      localStorage.setItem('userId', payload);
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
