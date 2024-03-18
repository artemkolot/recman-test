import { FC, useMemo, useState } from "react";
import { NewTask, Task } from "../Todo";
import Styles from "./TaskList.module.css";
import TaskPaginator from "../TaskPaginator";
import PaginatedList from "./PaginatedList";
import Footer from "./Footer";
import Header from "./Header";

type Booleanish = boolean | "true" | "false";

export type TaskActions = {
  add: (v: NewTask) => void;
  remove: (v: number) => void;
  update: (v: Task) => void;
  reorder: (v: number, v2: number) => void;
};

const TaskList: FC<{
  tasks: any[];
  actions: TaskActions;
}> = ({ tasks, actions }) => {
  const [filter, setFilter] = useState<Booleanish | string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredTasks = useMemo(() => {
    if (filter === "") {
      return tasks;
    }

    return tasks.filter(({ status }) => `${status}` === filter);
  }, [tasks, filter]);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <table className={Styles.table} id="table">
        <Header actions={actions} onFilterChange={setFilter}></Header>
        <PaginatedList
          data={filteredTasks}
          page={currentPage}
          actions={actions}
        />
        <Footer page={currentPage}>
          <TaskPaginator
            next={handleNext}
            prev={handlePrev}
            page={currentPage}
            total={Math.ceil(filteredTasks.length / 5)}
          />
        </Footer>
      </table>
    </>
  );
};

export default TaskList;
