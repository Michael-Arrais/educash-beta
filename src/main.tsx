
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedQuizzes } from "./scripts/seedQuizzes";
import { initTables } from "./scripts/initTables";

// Inicializar tabelas necessárias
initTables()
  .then(({ success }) => {
    if (success) {
      console.log("Tabelas inicializadas com sucesso!");
      
      // Após inicializar tabelas, inserir quizzes de exemplo
      return seedQuizzes();
    }
  })
  .then((result) => {
    if (result?.success) {
      console.log("Quizzes inicializados com sucesso!");
    }
  })
  .catch((error) => {
    console.error("Erro na inicialização:", error);
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
