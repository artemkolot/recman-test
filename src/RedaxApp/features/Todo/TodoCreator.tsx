import { useState } from "react";
import { useAppDispatch } from "../../store";
import { addTodo } from "./slice";
import { IconButton, OutlinedInput, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TodoCreator = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    dispatch(addTodo(value));
    setValue("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <>
      <Stack direction="row" width={"100%"} gap={2}>
        <OutlinedInput
          size="small"
          fullWidth
          value={value}
          onKeyDown={handleEnter}
          onChange={(e) => setValue(e.target.value)}
        ></OutlinedInput>
        <IconButton onClick={handleCreate}>
          <AddIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default TodoCreator;
