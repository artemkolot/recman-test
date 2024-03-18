import TodoCreator from "./TodoCreator";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import { Box, Card, CardContent, Stack } from "@mui/material";

const Todo = () => {
  return (
    <Card sx={{ maxWidth: "600px", width: "100%" }}>
      <CardContent>
        <Stack direction="row" gap={2}>
          <Box>
            <TodoFilter />
          </Box>
          <TodoCreator></TodoCreator>
        </Stack>
        <TodoList />
      </CardContent>
    </Card>
  );
};

export default Todo;
