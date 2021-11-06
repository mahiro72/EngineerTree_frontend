import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from "../features/auth/authSlice";
import studySlice from '../features/study/studySlice';
import studyReducer from '../features/study/studySlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth:authReducer,
    study:studySlice,

  },
});
//storeのdispatchの型を取得
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
