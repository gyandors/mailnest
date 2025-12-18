import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "react-toastify/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";

import { store } from "./store";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
