import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, Tasks } from "../../../PropsApp/components/Todo";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const localStorageData = () => {
  try {
    const localState = localStorage.getItem("todoState");
    return localState ? JSON.parse(localState) : [];
  } catch {
    return [];
  }
};

const initialState: { tasks: Tasks; filter: "true" | "false" | "" } = {
  tasks: localStorageData(),
  filter: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: new Date().getTime(),
        label: action.payload,
        status: false,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Task>) => {
      const updatedTask = state.tasks.find(
        ({ id }) => id === action.payload.id
      );
      if (updatedTask) {
        const taskIndex = state.tasks.indexOf(updatedTask);
        state.tasks[taskIndex] = action.payload;
      }
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const updatedTask = state.tasks.find(({ id }) => id === action.payload);
      if (updatedTask) {
        updatedTask.status = !updatedTask?.status;
      }
    },
    filterTodo: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, removeTodo, updateTodo, toggleTodo, filterTodo } =
  todoSlice.actions;

export const useTasks = () => {
  return useSelector((state: RootState) => {
    return state.todo.tasks;
  });
};

export const useFilter = () => {
  return useSelector((state: RootState) => {
    return state.todo.filter;
  });
};
