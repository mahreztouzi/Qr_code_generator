import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,

  document.getElementById("root")
);

reportWebVitals();
