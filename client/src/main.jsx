import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // j'importe mon provider pour passer mon store
import store from "./app/store"; // 'importe mon store
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
