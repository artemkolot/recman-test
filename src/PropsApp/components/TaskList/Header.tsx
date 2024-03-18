import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { TaskActions } from ".";
import { FC, useRef } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Styles from "./TaskList.module.css";

const Header: FC<{
  actions: TaskActions;
  onFilterChange: (val: string) => void;
}> = ({ actions, onFilterChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateTask = () => {
    const label = inputRef.current?.value;
    if (label !== "" && label !== undefined) {
      actions.add({ label });
      clearInputValue();
    }
  };

  const clearInputValue = () => {
    inputRef.current!.value = "";
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateTask();
    }
  };

  return (
    <>
      <thead>
        <tr>
          <th>
            <select
              name="filter"
              id="filter"
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Compl.</option>
              <option value="false">Uncompl.</option>
            </select>
          </th>
          <th style={{ display: "flex" }}>
            <input
              className={Styles.createInput}
              type="text"
              placeholder="Add new task"
              ref={inputRef}
              maxLength={20}
              onKeyDown={handleEnterKey}
            />
            <Button onClick={handleCreateTask}>
              <FontAwesomeIcon icon={faPlusCircle} color="#999" />
            </Button>
          </th>
        </tr>
      </thead>
    </>
  );
};

export default Header;
