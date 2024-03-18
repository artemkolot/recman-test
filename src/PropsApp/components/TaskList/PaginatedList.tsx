import { faBars, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { Tasks } from "../Todo";
import { FC, useRef, useState } from "react";
import { TaskActions } from ".";
import Styles from "./TaskList.module.css";

const PaginatedList: FC<{
  data: Tasks;
  page: number;
  actions: TaskActions;
}> = ({ data, page, actions }) => {
  const step = 5;
  const paginatedData = data.slice(page * step, (page + 1) * step);

  const dragTaskIndexRef = useRef<number | null>(null);
  const draggedOverTaskIndexRef = useRef<number | null>(null);

  const [dragTaskIndex, setDragTaskIndex] = useState<number | null>(null);
  const [draggedOverTaskIndex, setDraggedOverTask] = useState<number | null>(
    null
  );

  function handleSort() {
    if (
      draggedOverTaskIndexRef.current !== null &&
      dragTaskIndexRef.current !== null
    ) {
      if (dragTaskIndexRef.current !== draggedOverTaskIndexRef.current) {
        actions.reorder(
          dragTaskIndexRef.current + page * step,
          draggedOverTaskIndexRef.current + page * step
        );
      }
    }
    clearAllDraggData();
  }

  const clearAllDraggData = () => {
    dragTaskIndexRef.current = null;
    draggedOverTaskIndexRef.current = null;
    setDragTaskIndex(null);
    setDraggedOverTask(null);
  };

  const handleDragEnter = (index: number) => {
    if (index !== dragTaskIndex) {
      setDraggedOverTask(index);
    }
    draggedOverTaskIndexRef.current = index;
  };

  return (
    <>
      <tbody>
        {paginatedData.map(({ label, id, status }, index) => (
          <tr
            style={{
              outline:
                draggedOverTaskIndex === index ? "1px dashed #000" : "none",
            }}
            key={id}
            onDragStart={() => (dragTaskIndexRef.current = index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            draggable={dragTaskIndex === index}
          >
            <td>
              <input
                type="checkbox"
                checked={status}
                onChange={(e) =>
                  actions.update({ id, label, status: !!e.target.checked })
                }
              />
            </td>
            <td>
              <input
                type="text"
                disabled={status}
                className={Styles.taskInput}
                style={{ textDecoration: status ? "line-through" : "none" }}
                value={label}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
                onChange={(e) =>
                  actions.update({ id, status, label: e.target.value })
                }
              />
            </td>
            <td>
              <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
                <Button onClick={() => actions.remove(id)}>
                  <FontAwesomeIcon icon={faTrashCan} color="#999" />
                </Button>
                <Button onMouseDown={() => setDragTaskIndex(index)}>
                  <FontAwesomeIcon
                    style={{ cursor: "move" }}
                    icon={faBars}
                    color="#999"
                  />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default PaginatedList;
