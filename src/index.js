import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { MatchProvider } from "./context/CurrentMatchProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./context/AuthProvider";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <DndProvider backend={HTML5Backend}>
    <MatchProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MatchProvider>
  </DndProvider>
);
