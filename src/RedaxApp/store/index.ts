import { Middleware, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todo from "../features/Todo/slice";

const localStorageMiddleware: Middleware = () => (next) => (action) => {
  const forwardAction = next(action);
  const state = store.getState();
  localStorage.setItem("todoState", JSON.stringify(state.todo.tasks));
  return forwardAction;
};

const store = configureStore({
  reducer: { todo },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      localStorageMiddleware
    ),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
