import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { UserNav } from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    descricao: "",
    valor: 0,
    tipo: "despesa",
    categoria: "alimentacao",
    data_transacao: new Date().toISOString().split("T")[0],
  });
  const [newGoal, setNewGoal] = useState({
    titulo: "",
    descricao: "",
    valor_alvo: 0,
    valor_atual: 0,
    data_alvo: "",
  });
  const { toast } = useToast();
  const { user, profile } = useAuth();

  useEffect(() => {
    fetchTransactions();
    fetchGoals();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .eq("user_id", user.id)
        .order("data_transacao", { ascending: false });

      if (error) {
        console.error("Erro ao buscar transações:", error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from("metas")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Erro ao buscar metas:", error);
        return;
      }

      setGoals(data || []);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  const handleAddTransaction = async () => {
    if (!newTransaction.descricao || !newTransaction.valor || !newTransaction.categoria) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para adicionar uma transação.",
          variant: "destructive",
        });
        return;
      }

      const transactionWithUserId = {
        ...newTransaction,
        user_id: user.id
      };

      const { error } = await supabase
        .from("transacoes")
        .insert(transactionWithUserId);

      if (error) {
        toast({
          title: "Erro",
          description: "Falha ao adicionar transação: " + error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Transação adicionada com sucesso!",
        variant: "success",
      });

      setNewTransaction({
        descricao: "",
        valor: 0,
        tipo: "despesa",
        categoria: "alimentacao",
        data_transacao: new Date().toISOString().split("T")[0],
      });

      setIsAddTransactionOpen(false);
      fetchTransactions();
    } catch (error: any) {
      console.error("Erro ao adicionar transação:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar a transação.",
        variant: "destructive",
      });
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.titulo || !newGoal.valor_alvo || !newGoal.data_alvo) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para adicionar uma meta.",
          variant: "destructive",
        });
        return;
      }

      const goalWithUserId = {
        ...newGoal,
        user_id: user.id
      };

      const { error } = await supabase
        .from("metas")
        .insert(goalWithUserId);

      if (error) {
        toast({
          title: "Erro",
          description: "Falha ao adicionar meta: " + error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Meta adicionada com sucesso!",
        variant: "success",
      });

      setNewGoal({
        titulo: "",
        descricao: "",
        valor_alvo: 0,
        valor_atual: 0,
        data_alvo: "",
      });

      setIsAddGoalOpen(false);
      fetchGoals();
    } catch (error: any) {
      console.error("Erro ao adicionar meta:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar a meta.",
        variant: "destructive",
      });
    }
  };

  const totalIncome = transactions
    .filter((t) => t.tipo === "receita")
    .reduce((sum, t) => sum + t.valor, 0);

  const totalExpenses = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((sum, t) => sum + t.valor, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Olá, {profile?.nome || "Usuário"}! Acompanhe suas finanças de perto.</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <UserNav />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Saldo Atual</CardTitle>
                <CardDescription>Sua situação financeira geral.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ {balance.toFixed(2)}</div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Receitas</div>
                  <div className="text-sm text-green-600">R$ {totalIncome.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Despesas</div>
                  <div className="text-sm text-red-600">R$ {totalExpenses.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adicionar Transação</CardTitle>
                <CardDescription>Registre uma nova receita ou despesa.</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Adicionar Transação</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adicionar Transação</DialogTitle>
                      <DialogDescription>
                        Registre uma nova receita ou despesa para acompanhar seu orçamento.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Descrição
                        </Label>
                        <Input
                          type="text"
                          id="description"
                          value={newTransaction.descricao}
                          onChange={(e) => setNewTransaction({ ...newTransaction, descricao: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="value" className="text-right">
                          Valor
                        </Label>
                        <Input
                          type="number"
                          id="value"
                          value={newTransaction.valor}
                          onChange={(e) => setNewTransaction({ ...newTransaction, valor: parseFloat(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Tipo
                        </Label>
                        <Select value={newTransaction.tipo} onValueChange={(value) => setNewTransaction({ ...newTransaction, tipo: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="receita">Receita</SelectItem>
                            <SelectItem value="despesa">Despesa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Categoria
                        </Label>
                        <Select value={newTransaction.categoria} onValueChange={(value) => setNewTransaction({ ...newTransaction, categoria: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alimentacao">Alimentação</SelectItem>
                            <SelectItem value="transporte">Transporte</SelectItem>
                            <SelectItem value="lazer">Lazer</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Data
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="col-span-3 pl-3 text-left font-normal"
                            >
                              {newTransaction.data_transacao ? (
                                format(new Date(newTransaction.data_transacao), "PPP")
                              ) : (
                                <span>Selecione a data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center" side="bottom">
                            <Calendar
                              mode="single"
                              selected={newTransaction.data_transacao ? new Date(newTransaction.data_transacao) : undefined}
                              onSelect={(date) => setNewTransaction({ ...newTransaction, data_transacao: date?.toISOString().split("T")[0] || "" })}
                              disabled={(date) =>
                                date > new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddTransaction}>Adicionar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adicionar Meta</CardTitle>
                <CardDescription>Defina um objetivo financeiro para o futuro.</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Adicionar Meta</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adicionar Meta</DialogTitle>
                      <DialogDescription>
                        Defina um objetivo financeiro para o futuro e acompanhe seu progresso.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Título
                        </Label>
                        <Input
                          type="text"
                          id="title"
                          value={newGoal.titulo}
                          onChange={(e) => setNewGoal({ ...newGoal, titulo: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Descrição
                        </Label>
                        <Input
                          type="text"
                          id="description"
                          value={newGoal.descricao}
                          onChange={(e) => setNewGoal({ ...newGoal, descricao: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetValue" className="text-right">
                          Valor Alvo
                        </Label>
                        <Input
                          type="number"
                          id="targetValue"
                          value={newGoal.valor_alvo}
                          onChange={(e) => setNewGoal({ ...newGoal, valor_alvo: parseFloat(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currentValue" className="text-right">
                          Valor Atual
                        </Label>
                        <Input
                          type="number"
                          id="currentValue"
                          value={newGoal.valor_atual}
                          onChange={(e) => setNewGoal({ ...newGoal, valor_atual: parseFloat(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Data Alvo
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="col-span-3 pl-3 text-left font-normal"
                            >
                              {newGoal.data_alvo ? (
                                format(new Date(newGoal.data_alvo), "PPP")
                              ) : (
                                <span>Selecione a data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center" side="bottom">
                            <Calendar
                              mode="single"
                              selected={newGoal.data_alvo ? new Date(newGoal.data_alvo) : undefined}
                              onSelect={(date) => setNewGoal({ ...newGoal, data_alvo: date?.toISOString().split("T")[0] || "" })}
                              disabled={(date) =>
                                date > new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddGoal}>Adicionar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Metas Financeiras</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {goals.map((goal) => (
                    <Card key={goal.id}>
                      <CardHeader>
                        <CardTitle>{goal.titulo}</CardTitle>
                        <CardDescription>{goal.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="text-sm text-gray-600">Progresso</div>
                          <Progress value={(goal.valor_atual / goal.valor_alvo) * 100} />
                          <div className="text-sm text-gray-600">
                            {((goal.valor_atual / goal.valor_alvo) * 100).toFixed(2)}%
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Valor Atual</div>
                          <div className="text-sm text-blue-600">R$ {goal.valor_atual.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Valor Alvo</div>
                          <div className="text-sm text-green-600">R$ {goal.valor_alvo.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Data Alvo</div>
                          <div className="text-sm text-gray-800">{goal.data_alvo}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Transações Recentes</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{transaction.descricao}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">R$ {transaction.valor.toFixed(2)}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{transaction.tipo}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{transaction.categoria}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{transaction.data_transacao}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assistente FinAI</h2>
              <div className="h-[calc(100vh-200px)]">
                <AIChat />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
