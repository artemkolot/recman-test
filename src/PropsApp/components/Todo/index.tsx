import { useState } from "react";
import TaskList from "../TaskList";
import Styles from "./Todo.module.css";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export type Task = {
  id: number;
  label: string;
  status: boolean;
};

export type Tasks = Task[];
const createId = () => {
  return new Date().getTime();
};

const initialData = () => {
  const savedData = localStorage.getItem("data");
  if (savedData !== null) {
    return JSON.parse(savedData);
  }
  return [];
};

export type NewTask = Pick<Task, "label">;
const Todo = () => {
  const [tasks, setTasks] = useState<Tasks>(() => initialData());
  useLocalStorage(tasks);

  const updateTask = ({ id, ...newData }: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { id, ...newData } : task))
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (newTask: NewTask) => {
    const id = createId();
    setTasks((prev) => [{ ...newTask, id, status: false }, ...prev]);
  };

  const reorderTasks = (index1: number, index2: number) => {
    const reorderedTasks = [...tasks];
    [reorderedTasks[index1], reorderedTasks[index2]] = [
      reorderedTasks[index2],
      reorderedTasks[index1],
    ];
    setTasks(reorderedTasks);
  };

  const actions = {
    update: updateTask,
    remove: removeTask,
    add: addTask,
    reorder: reorderTasks,
  };

  return (
    <>
      <div className={Styles.flexColumn}>
        <div className={Styles.card}>
          <TaskList tasks={tasks} actions={actions} />
        </div>
      </div>
    </>
  );
};

export default Todo;
