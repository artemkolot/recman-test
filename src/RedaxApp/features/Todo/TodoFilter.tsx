import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch } from "../../store";
import { filterTodo, useFilter } from "./slice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const filter = useFilter();
  const handleFilterChange = (e: SelectChangeEvent<"" | "true" | "false">) => {
    dispatch(filterTodo(e.target.value));
  };
  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={filter}
        size="small"
        onChange={handleFilterChange}
      >
        <MenuItem value="">
          <LibraryAddCheckIcon />
        </MenuItem>
        <MenuItem value="true">
          <CheckBoxIcon />
        </MenuItem>
        <MenuItem value="false">
          <CheckBoxOutlineBlankIcon />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default TodoFilter;
