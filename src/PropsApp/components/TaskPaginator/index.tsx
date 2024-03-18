import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./TaskPaginator.module.css";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

const TaskPaginator: FC<{
  next: any;
  prev: any;
  page: number;
  total: number;
}> = ({ next, prev, page, total }) => {
  return (
    <>
      <div className={Styles.navigate}>
        <button
          role="button"
          className={Styles.navigateButton}
          onClick={prev}
          disabled={page <= 0}
        >
          <FontAwesomeIcon icon={faCircleLeft} color="#999" />
          <span>Previous</span>
        </button>
        <button
          role="button"
          className={Styles.navigateButton}
          onClick={next}
          disabled={page === total - 1}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faCircleRight} color="#999" />
        </button>
      </div>
    </>
  );
};

export default TaskPaginator;
