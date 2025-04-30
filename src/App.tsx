
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Recursos from "./pages/Recursos";
import Educacao from "./pages/Educacao";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingAIButtonCustom from "./components/FloatingAIButtonCustom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recursos"
                element={
                  <PrivateRoute>
                    <Recursos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/educacao"
                element={
                  <PrivateRoute>
                    <Educacao />
                  </PrivateRoute>
                }
              />
              <Route
                path="/educacao/quiz/:id"
                element={
                  <PrivateRoute>
                    <QuizPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <FloatingAIButtonCustom />
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
