
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedQuizzes } from "./scripts/seedQuizzes";

// Inicializar dados de exemplo para quizzes
seedQuizzes()
  .then(({ success }) => {
    if (success) {
      console.log("Quizzes inicializados com sucesso!");
    }
  })
  .catch((error) => {
    console.error("Erro ao inicializar quizzes:", error);
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
