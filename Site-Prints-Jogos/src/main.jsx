import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/main.css";
import "./styles/bootstrap-lite.css";

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
