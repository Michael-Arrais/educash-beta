
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserNav } from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { FinancialSummaryCard } from "@/components/dashboard/FinancialSummaryCard";
import { AddTransactionCard } from "@/components/dashboard/AddTransactionCard";
import { FinancialGoalsList } from "@/components/dashboard/FinancialGoalsList";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
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

  const handleAddTransaction = async (newTransaction: any) => {
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
        variant: "default",
      });

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
            <FinancialSummaryCard 
              balance={balance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
            <AddTransactionCard onAddTransaction={handleAddTransaction} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Metas Financeiras</h2>
                <FinancialGoalsList goals={goals} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Transações Recentes</h2>
                <TransactionsTable transactions={transactions} />
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
