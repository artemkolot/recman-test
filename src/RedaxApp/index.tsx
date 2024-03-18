import { Provider } from "react-redux";
import store from "./store";
import Todo from "./features/Todo";

const RedaxApp = () => {
  return (
    <Provider store={store}>
      <Todo></Todo>
    </Provider>
  );
};

export default RedaxApp;
