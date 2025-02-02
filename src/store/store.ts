import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import flowReducer from "@/store/slice/flowSlice";
import layoutReducer from "@/store/slice/layoutSlice";
import respondentReducer from "@/features/respondent/stores/respondentSlice";
import userReducer from "@/store/slice/userSlice";

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root", // ストレージに保存するキー
//   storage,
// };

// const logMiddleware = (store) => (next) => (action) => {
//   console.log("Dispatching action:", action);
//   return next(action);
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    flow: flowReducer,
    layout: layoutReducer,
    respondent: respondentReducer,
    // user: persistedReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 非シリアライズ可能な値を無視するための例外を指定
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// const persistor = persistStore(store);

// stateの型を全部取得する
export type RootState = ReturnType<typeof store.getState>;

// dispatchの型を全部取得する
export type RootDispatch = typeof store.dispatch;

// 型情報をもったuseSelectorとuseDispatchを作成
const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<RootDispatch>();

export { store, useAppSelector, useAppDispatch };

// export { store, useAppSelector, useAppDispatch, persistor };
