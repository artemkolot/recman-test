import { Task } from "../../../PropsApp/components/Todo";
import DeleteButton from "../../components/DeleteButton";
import { useAppDispatch } from "../../store";
import { toggleTodo, updateTodo, useFilter, useTasks } from "./slice";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import React, { FC, useState } from "react";

const TodoList = () => {
  const tasks = useTasks();
  const filter = useFilter();
  const [dialogData, setDialogData] = useState<{
    open: boolean;
    data: Task | null;
  }>({
    open: false,
    data: null,
  });

  const dispatch = useAppDispatch();

  const handleChanges = (updatedTask: Task) => {
    dispatch(updateTodo(updatedTask));
  };

  const openDialog = (editableTask: Task) => {
    setDialogData({ open: true, data: editableTask });
  };

  const closeDialog = () => {
    setDialogData({ data: null, open: false });
  };

  const filteredTasks = () => {
    return tasks.filter(({ status }) => {
      if (filter === "") {
        return tasks;
      }
      return String(status) === filter;
    });
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {filteredTasks().map(({ id, label, status }) => (
          <ListItem key={id} sx={{ width: "100%" }} disablePadding>
            <ListItemButton
              sx={{ width: "100%" }}
              role={undefined}
              onClick={() => dispatch(toggleTodo(id))}
              dense
            >
              <ListItemIcon>
                <Checkbox checked={status} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
              />
            </ListItemButton>
            <Stack direction="row" gap={2}>
              <DeleteButton taskId={id} />
              <IconButton
                color="info"
                onClick={() => {
                  openDialog({ id, label, status });
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </List>
      {dialogData.open && (
        <EditDialog
          {...dialogData}
          onClose={closeDialog}
          onSave={handleChanges}
        />
      )}
    </>
  );
};

const EditDialog: FC<{
  open: boolean;
  data: Task | null;
  onClose: () => void;
  onSave: (v: Task) => void;
}> = ({ data, onSave, onClose, open }) => {
  if (data === null) {
    return null;
  }

  const [newValue, setNewValue] = useState<string>(data.label);

  const handleSave = () => {
    if (data !== null) {
      onSave({ ...data, label: newValue });
    }
    onClose();
  };

  const handleClose = (reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "escapeKeyDown") {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={(_, reason) => {
        handleClose(reason);
      }}
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <OutlinedInput
          fullWidth
          size="small"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        ></OutlinedInput>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="small" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoList;
