
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Mostrar um indicador de carregamento enquanto verifica a autenticação
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    // Redirecionar para o login se não estiver autenticado
    return <Navigate to="/login" />;
  }

  // Renderizar o componente filho se estiver autenticado
  return <>{children}</>;
};

export default PrivateRoute;
