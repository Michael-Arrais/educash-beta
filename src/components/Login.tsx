
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CashLogo from "./CashLogo";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            nome: registerName,
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Erro ao criar conta");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Mascot positioned above login form on mobile, left side on desktop */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <div className="text-center">
          <img 
            src="/lovable-uploads/df65cb99-1db2-44e6-a5b6-4153b73bfe4c.png" 
            alt="EduCash Mascot"
            className="w-96 h-96 object-contain mx-auto mb-8"
            style={{
              filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))',
              mixBlendMode: 'multiply'
            }}
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bem-vindo ao EduCash!
          </h2>
          <p className="text-gray-600 max-w-md">
            Sua jornada para a inteligência financeira começa aqui. 
            Aprenda, gerencie e cresça com o CashIA ao seu lado.
          </p>
        </div>
      </div>

      {/* Right side - Login form with mascot on top for mobile */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        {/* Mobile mascot - shown only on small screens */}
        <div className="lg:hidden mb-6 text-center">
          <img 
            src="/lovable-uploads/df65cb99-1db2-44e6-a5b6-4153b73bfe4c.png" 
            alt="EduCash Mascot"
            className="w-48 h-48 sm:w-64 sm:h-64 object-contain mx-auto mb-4"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
              mixBlendMode: 'multiply'
            }}
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Bem-vindo ao EduCash!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-sm mx-auto">
            Sua jornada para a inteligência financeira começa aqui.
          </p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <CashLogo className="w-10 h-10 text-white" />
            </div>
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Bem-vindo ao EduCash
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sua plataforma de inteligência financeira
            </p>
          </div>

          <Card className="shadow-lg">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Entre com seu e-mail e senha para acessar sua conta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">Senha</label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-600"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <CardHeader>
                    <CardTitle>Criar conta</CardTitle>
                    <CardDescription>
                      Insira seus dados para criar uma nova conta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nome</label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="register-email" className="text-sm font-medium">E-mail</label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="register-password" className="text-sm font-medium">Senha</label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">Confirmar Senha</label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-600"
                      disabled={loading}
                    >
                      {loading ? "Criando conta..." : "Criar conta"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
