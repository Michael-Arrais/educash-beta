
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FinancialSummaryCard } from "@/components/dashboard/FinancialSummaryCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { AddTransactionCard } from "@/components/dashboard/AddTransactionCard";
import FinancialGoalsCard from "@/components/dashboard/FinancialGoalsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data_transacao: string;
}

interface Goal {
  id: string;
  titulo: string;
  descricao: string;
  valor_atual: number;
  valor_alvo: number;
  data_alvo: string;
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactionsAndGoals = async () => {
    try {
      setIsLoading(true);
      if (user) {
        // Fetch transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from("transacoes")
          .select("*")
          .eq("user_id", user.id)
          .order("data_transacao", { ascending: false });

        if (transactionsError) throw transactionsError;
        setTransactions(transactionsData || []);
        
        // Fetch goals
        const { data: goalsData, error: goalsError } = await supabase
          .from("metas")
          .select("*")
          .eq("user_id", user.id)
          .eq("ativo", true)
          .order("data_alvo", { ascending: true });
          
        if (goalsError) throw goalsError;
        setGoals(goalsData || []);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar dados da dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionsAndGoals();
  }, [user]);

  const addTransaction = async (newTransaction: Omit<Transaction, "id">) => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("transacoes")
        .insert({
          ...newTransaction,
          user_id: user.id,
        })
        .select();

      if (error) throw error;

      setTransactions((prev) => [data[0], ...prev]);
      toast.success("Transação adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      toast.error("Erro ao adicionar transação");
      throw error;
    }
  };

  const addFinancialGoal = async (newGoal: Omit<Goal, "id">) => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("metas")
        .insert({
          ...newGoal,
          user_id: user.id,
        })
        .select();

      if (error) throw error;

      setGoals((prev) => [...prev, data[0]]);
      return;
    } catch (error) {
      console.error("Erro ao adicionar meta:", error);
      toast.error("Erro ao adicionar meta financeira");
      throw error;
    }
  };

  const updateGoalValue = async (goalId: string, newValue: number) => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from("metas")
        .update({ valor_atual: newValue })
        .eq("id", goalId)
        .eq("user_id", user.id);

      if (error) throw error;

      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === goalId ? { ...goal, valor_atual: newValue } : goal
        )
      );
      return;
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
      toast.error("Erro ao atualizar meta financeira");
      throw error;
    }
  };

  // Calculate financial summary
  const calculateSummary = () => {
    const totalIncome = transactions
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + t.valor, 0);

    const totalExpenses = transactions
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + t.valor, 0);

    const balance = totalIncome - totalExpenses;

    return { balance, totalIncome, totalExpenses };
  };

  const { balance, totalIncome, totalExpenses } = calculateSummary();

  // Get user's first name for greeting
  const firstName = profile?.nome ? profile.nome.split(' ')[0] : 'usuário';

  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg text-gray-600">Bem-vindo, {firstName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <FinancialSummaryCard
            balance={balance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="transactions" className="h-full">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="goals">Meu Pé-de-meia</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="space-y-6">
              <AddTransactionCard onAddTransaction={addTransaction} />
              {transactions.length > 0 ? (
                <TransactionsTable transactions={transactions} />
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p>Nenhuma transação registrada.</p>
                  <p className="text-gray-500">Adicione sua primeira transação usando o formulário acima.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="goals" className="h-full">
              <FinancialGoalsCard 
                goals={goals} 
                onAddGoal={addFinancialGoal}
                onUpdateGoal={updateGoalValue}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
