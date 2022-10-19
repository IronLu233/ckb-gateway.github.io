import React from "react";
import ReactDOM from "react-dom/client";
import { predefined, initializeConfig } from "@ckb-lumos/config-manager";
import App from "./App";
import "./index.css";

initializeConfig(predefined[import.meta.env.VITE_LUMOS_CONFIG_NAME]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
