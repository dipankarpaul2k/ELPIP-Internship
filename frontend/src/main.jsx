import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";

import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';

import { store } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
        <Toaster />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
