import App from "./App";
import React from "react";
import store from "./store/index";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
