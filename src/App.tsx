import { CSSProperties } from "react";
import Todo from "./PropsApp/components/Todo";
import RedaxApp from "./RedaxApp";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Stack } from "@mui/material";

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};
function App() {
  return (
    <div style={styles}>
      <BrowserRouter>
        <Stack direction="row" gap={2}>
          <Link to="/props">No libs app</Link>
          <Link to="/redax-mui">Redax + MUI app</Link>
        </Stack>
        <Routes>
          <Route path="/props" element={<Todo />}></Route>
          <Route path="/redax-mui" element={<RedaxApp />}></Route>
          <Route path="" element={<Navigate to="/props" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
