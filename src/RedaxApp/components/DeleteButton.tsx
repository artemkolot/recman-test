import { FC } from "react";
import { useAppDispatch } from "../store";
import { removeTodo } from "../features/Todo/slice";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteButton: FC<{ taskId: number }> = ({ taskId }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeTodo(taskId));
  };

  return (
    <IconButton onClick={handleClick} color="error">
      <DeleteForeverIcon></DeleteForeverIcon>
    </IconButton>
  );
};

export default DeleteButton;
