import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { MatchProvider } from "./context/CurrentMatchProvider";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <MatchProvider>
      <App />
    </MatchProvider>
);
