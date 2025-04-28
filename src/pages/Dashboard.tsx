
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { UserNav } from "@/components/UserNav";

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [balanceData, setBalanceData] = useState({ labels: [], datasets: [] });
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthIncome, setMonthIncome] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  
  // Formulário de transação
  const [transactionForm, setTransactionForm] = useState({
    descricao: "",
    valor: "",
    tipo: "receita",
    categoria: "alimentacao",
    data_transacao: format(new Date(), 'yyyy-MM-dd')
  });

  // Formulário de meta
  const [goalForm, setGoalForm] = useState({
    titulo: "",
    descricao: "",
    valor_alvo: "",
    valor_atual: "0",
    data_alvo: format(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'yyyy-MM-dd')
  });

  // Carregar dados do usuário
  useEffect(() => {
    if (profile) {
      fetchTransactions();
      fetchGoals();
    }
  }, [profile]);

  // Função para buscar transações
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .order('data_transacao', { ascending: false });
      
      if (error) throw error;
      
      setTransactions(data || []);
      processTransactionsData(data || []);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      toast.error("Erro ao carregar as transações");
    } finally {
      setLoading(false);
    }
  };
  
  // Função para buscar metas
  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('metas')
        .select('*')
        .order('data_alvo', { ascending: true });
      
      if (error) throw error;
      
      setGoals(data || []);
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
      toast.error("Erro ao carregar as metas");
    }
  };

  // Processar dados para os gráficos
  const processTransactionsData = (transactions) => {
    // Calcular saldo total
    let balance = 0;
    let incomeThisMonth = 0;
    let expensesThisMonth = 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.data_transacao);
      const isCurrentMonth = 
        transactionDate.getMonth() === currentMonth && 
        transactionDate.getFullYear() === currentYear;
      
      if (transaction.tipo === 'receita') {
        balance += parseFloat(transaction.valor);
        if (isCurrentMonth) incomeThisMonth += parseFloat(transaction.valor);
      } else {
        balance -= parseFloat(transaction.valor);
        if (isCurrentMonth) expensesThisMonth += parseFloat(transaction.valor);
      }
    });
    
    setTotalBalance(balance);
    setMonthIncome(incomeThisMonth);
    setMonthExpenses(expensesThisMonth);
    
    // Preparar dados para os gráficos
    prepareChartData(transactions);
  };

  // Preparar dados para os gráficos
  const prepareChartData = (transactions) => {
    // Dados para o gráfico de evolução do saldo
    const last6Months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push(format(month, 'MMM', { locale: pt }));
    }
    
    const monthlyBalances = Array(6).fill(0);
    const monthlyIncomes = Array(6).fill(0);
    const monthlyExpenses = Array(6).fill(0);
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.data_transacao);
      const monthsAgo = today.getMonth() - transactionDate.getMonth() + 
        (today.getFullYear() - transactionDate.getFullYear()) * 12;
      
      if (monthsAgo >= 0 && monthsAgo < 6) {
        const monthIndex = 5 - monthsAgo;
        const amount = parseFloat(transaction.valor);
        
        if (transaction.tipo === 'receita') {
          monthlyIncomes[monthIndex] += amount;
          monthlyBalances[monthIndex] += amount;
        } else {
          monthlyExpenses[monthIndex] += amount;
          monthlyBalances[monthIndex] -= amount;
        }
      }
    });
    
    // Acumular saldos mensais
    for (let i = 1; i < 6; i++) {
      monthlyBalances[i] += monthlyBalances[i - 1];
    }
    
    setBalanceData({
      labels: last6Months,
      datasets: [{
        label: 'Saldo',
        data: monthlyBalances,
        borderColor: '#9b87f5',
        backgroundColor: 'rgba(155, 135, 245, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    });
    
    setExpensesData({
      labels: last6Months,
      datasets: [
        {
          label: 'Receitas',
          data: monthlyIncomes,
          backgroundColor: 'rgba(30, 174, 219, 0.7)',
        },
        {
          label: 'Despesas',
          data: monthlyExpenses,
          backgroundColor: 'rgba(249, 115, 22, 0.7)',
        }
      ]
    });
    
    // Dados para o gráfico de categorias
    const categories = {
      'alimentacao': 0,
      'transporte': 0,
      'material': 0,
      'lazer': 0,
      'poupanca': 0,
      'outros': 0
    };
    
    transactions.forEach(transaction => {
      if (transaction.tipo !== 'receita') {
        if (categories.hasOwnProperty(transaction.categoria)) {
          categories[transaction.categoria] += parseFloat(transaction.valor);
        } else {
          categories['outros'] += parseFloat(transaction.valor);
        }
      }
    });
    
    const categoryLabels = Object.keys(categories).map(key => {
      const categoryNames = {
        'alimentacao': 'Alimentação',
        'transporte': 'Transporte',
        'material': 'Material Escolar',
        'lazer': 'Lazer',
        'poupanca': 'Poupança',
        'outros': 'Outros'
      };
      return categoryNames[key];
    });
    
    const categoryValues = Object.values(categories);
    
    setCategoryData({
      labels: categoryLabels,
      datasets: [{
        data: categoryValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      }]
    });
  };

  // Adicionar nova transação
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    
    try {
      const { descricao, valor, tipo, categoria, data_transacao } = transactionForm;
      
      if (!descricao || !valor || !tipo || !categoria || !data_transacao) {
        toast.error("Preencha todos os campos");
        return;
      }
      
      const { error } = await supabase
        .from('transacoes')
        .insert([{
          descricao,
          valor: parseFloat(valor),
          tipo,
          categoria,
          data_transacao
        }]);
      
      if (error) throw error;
      
      toast.success("Transação adicionada com sucesso");
      setIsAddTransactionOpen(false);
      setTransactionForm({
        descricao: "",
        valor: "",
        tipo: "receita",
        categoria: "alimentacao",
        data_transacao: format(new Date(), 'yyyy-MM-dd')
      });
      fetchTransactions();
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      toast.error("Erro ao adicionar transação");
    }
  };

  // Adicionar nova meta
  const handleAddGoal = async (e) => {
    e.preventDefault();
    
    try {
      const { titulo, descricao, valor_alvo, valor_atual, data_alvo } = goalForm;
      
      if (!titulo || !valor_alvo || !data_alvo) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
      
      const { error } = await supabase
        .from('metas')
        .insert([{
          titulo,
          descricao,
          valor_alvo: parseFloat(valor_alvo),
          valor_atual: parseFloat(valor_atual) || 0,
          data_alvo
        }]);
      
      if (error) throw error;
      
      toast.success("Meta adicionada com sucesso");
      setIsAddGoalOpen(false);
      setGoalForm({
        titulo: "",
        descricao: "",
        valor_alvo: "",
        valor_atual: "0",
        data_alvo: format(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'yyyy-MM-dd')
      });
      fetchGoals();
    } catch (error) {
      console.error("Erro ao adicionar meta:", error);
      toast.error("Erro ao adicionar meta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Financeiro</h1>
              <p className="text-gray-600">Olá, {profile?.nome || "Estudante"}! Aqui está o resumo das suas finanças.</p>
            </div>
            <div className="mt-4 lg:mt-0 flex gap-2">
              <Button className="bg-primary hover:bg-primary-600" onClick={() => setIsAddTransactionOpen(true)}>
                Adicionar Transação
              </Button>
              <UserNav />
            </div>
          </div>
          
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Saldo Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">R$ {totalBalance.toFixed(2)}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  {monthIncome > 0 ? (((monthIncome - monthExpenses) / monthIncome) * 100).toFixed(0) : 0}% desde o mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Receitas (Mês)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">R$ {monthIncome.toFixed(2)}</div>
                <p className="text-xs text-gray-500">
                  {transactions.length > 0 
                    ? `Último recebimento: ${format(new Date(transactions.find(t => t.tipo === 'receita')?.data_transacao || new Date()), 'dd/MM')}`
                    : 'Nenhum recebimento'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Despesas (Mês)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">R$ {monthExpenses.toFixed(2)}</div>
                <p className="text-xs text-red-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  {monthIncome > 0 ? ((monthExpenses / monthIncome) * 100).toFixed(0) : 0}% do total de receitas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Economia (Mês)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {monthIncome > 0 ? (((monthIncome - monthExpenses) / monthIncome) * 100).toFixed(0) : 0}%
                </div>
                <p className="text-xs text-gray-500">Meta: 30%</p>
                <Progress 
                  value={monthIncome > 0 ? Math.min((((monthIncome - monthExpenses) / monthIncome) * 100), 100) : 0} 
                  className="h-1 mt-2" 
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs de conteúdo */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="transactions">Transações</TabsTrigger>
              <TabsTrigger value="goals">Metas</TabsTrigger>
              <TabsTrigger value="assistant">Assistente FinAI</TabsTrigger>
            </TabsList>
            
            {/* Tab de Visão Geral */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução do Saldo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      {balanceData.labels.length > 0 ? (
                        <Line 
                          data={balanceData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              y: {
                                beginAtZero: true,
                                ticks: {
                                  callback: (value) => `R$ ${value}`
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500">Sem dados suficientes</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Receitas vs. Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      {expensesData.labels.length > 0 ? (
                        <Bar 
                          data={expensesData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              y: {
                                beginAtZero: true,
                                ticks: {
                                  callback: (value) => `R$ ${value}`
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500">Sem dados suficientes</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Últimas Transações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{transaction.descricao}</p>
                            <p className="text-xs text-gray-500">{format(new Date(transaction.data_transacao), 'dd/MM/yyyy')}</p>
                          </div>
                          <div className={`font-semibold ${transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.tipo === 'receita' ? `+R$ ${parseFloat(transaction.valor).toFixed(2)}` : `-R$ ${parseFloat(transaction.valor).toFixed(2)}`}
                          </div>
                        </div>
                      ))}
                      {transactions.length === 0 && (
                        <p className="text-center text-gray-500 py-4">Nenhuma transação registrada</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      {categoryData.labels.length > 0 && categoryData.datasets[0].data.some(val => val > 0) ? (
                        <Doughnut 
                          data={categoryData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: {
                                  boxWidth: 12,
                                  padding: 15
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500">Sem dados de gastos</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Projeção Futura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-primary-100 text-gray-800 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium mb-2">Com base no seu padrão atual de gastos e economia:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {goals.length > 0 ? (
                            <>
                              <li>Você atingirá sua meta de {goals[0].titulo} em aproximadamente {
                                monthIncome - monthExpenses > 0 
                                  ? Math.ceil((parseFloat(goals[0].valor_alvo) - parseFloat(goals[0].valor_atual)) / (monthIncome - monthExpenses))
                                  : "muitos"
                              } meses</li>
                              <li>Se aumentar sua economia em 5% por mês, você atingirá a meta mais rápido</li>
                            </>
                          ) : (
                            <li>Adicione metas financeiras para ver projeções personalizadas</li>
                          )}
                          <li>Se continuar economizando {monthIncome > 0 ? (((monthIncome - monthExpenses) / monthIncome) * 100).toFixed(0) : 0}% do seu auxílio, terá R$ {
                            ((monthIncome - monthExpenses) * 36).toFixed(2)
                          } ao final do ensino médio</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab de Transações */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Histórico de Transações</CardTitle>
                  <Button onClick={() => setIsAddTransactionOpen(true)}>Adicionar</Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="p-3 font-medium">Descrição</th>
                          <th className="p-3 font-medium">Data</th>
                          <th className="p-3 font-medium">Categoria</th>
                          <th className="p-3 font-medium text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => {
                          const categoryNames = {
                            'alimentacao': 'Alimentação',
                            'transporte': 'Transporte',
                            'material': 'Material Escolar',
                            'lazer': 'Lazer',
                            'poupanca': 'Poupança',
                            'outros': 'Outros'
                          };
                          
                          return (
                            <tr key={transaction.id} className="border-t">
                              <td className="p-3">{transaction.descricao}</td>
                              <td className="p-3 text-sm text-gray-500">{format(new Date(transaction.data_transacao), 'dd/MM/yyyy')}</td>
                              <td className="p-3 text-sm">{categoryNames[transaction.categoria] || transaction.categoria}</td>
                              <td className={`p-3 text-right font-medium ${
                                transaction.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.tipo === 'receita' ? `+R$ ${parseFloat(transaction.valor).toFixed(2)}` : `-R$ ${parseFloat(transaction.valor).toFixed(2)}`}
                              </td>
                            </tr>
                          );
                        })}
                        {transactions.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-gray-500">
                              Nenhuma transação registrada. Clique em "Adicionar" para registrar sua primeira transação.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab de Metas */}
            <TabsContent value="goals">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader>
                      <CardTitle>{goal.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">Progresso</p>
                          <p className="text-sm font-medium">{Math.round((parseFloat(goal.valor_atual) / parseFloat(goal.valor_alvo)) * 100)}%</p>
                        </div>
                        <Progress value={(parseFloat(goal.valor_atual) / parseFloat(goal.valor_alvo)) * 100} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <p>R$ {parseFloat(goal.valor_atual).toFixed(2)} de R$ {parseFloat(goal.valor_alvo).toFixed(2)}</p>
                          <p className="text-gray-500">Meta: {format(new Date(goal.data_alvo), 'MM/yyyy')}</p>
                        </div>
                        {goal.descricao && (
                          <p className="text-sm text-gray-500">{goal.descricao}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card 
                  className="bg-gray-50 border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setIsAddGoalOpen(true)}
                >
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="font-medium">Adicionar Nova Meta</p>
                  </div>
                </Card>

                {goals.length === 0 && (
                  <div className="lg:col-span-2 p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                    <p className="mb-4">Você ainda não tem metas financeiras cadastradas.</p>
                    <p>Adicione sua primeira meta para começar a planejar seu futuro financeiro!</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Tab do Assistente */}
            <TabsContent value="assistant">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Assistente FinAI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AIChat />
                  </CardContent>
                </Card>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dicas Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm">Economize pelo menos 20% do seu auxílio todo mês.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm">Anote todas as suas despesas, mesmo as pequenas.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm">Pense duas vezes antes de fazer compras por impulso.</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Aprendizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Conteúdos recomendados para você:</p>
                        <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <p className="font-medium">Como criar um orçamento pessoal</p>
                          <p className="text-xs text-gray-500">5 minutos de leitura</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <p className="font-medium">Introdução a investimentos</p>
                          <p className="text-xs text-gray-500">Vídeo: 8 minutos</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <p className="font-medium">Quiz: Teste seus conhecimentos</p>
                          <p className="text-xs text-gray-500">10 perguntas</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Modal para adicionar transação */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>
              Registre uma nova entrada ou saída financeira.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">Descrição</label>
              <Input
                id="descricao"
                value={transactionForm.descricao}
                onChange={(e) => setTransactionForm({...transactionForm, descricao: e.target.value})}
                placeholder="Ex: Auxílio estudantil"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valor" className="text-sm font-medium">Valor (R$)</label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={transactionForm.valor}
                onChange={(e) => setTransactionForm({...transactionForm, valor: e.target.value})}
                placeholder="0,00"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tipo" className="text-sm font-medium">Tipo</label>
              <Select 
                value={transactionForm.tipo} 
                onValueChange={(value) => setTransactionForm({...transactionForm, tipo: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                  <SelectItem value="poupanca">Poupança</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="categoria" className="text-sm font-medium">Categoria</label>
              <Select 
                value={transactionForm.categoria} 
                onValueChange={(value) => setTransactionForm({...transactionForm, categoria: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="material">Material Escolar</SelectItem>
                  <SelectItem value="lazer">Lazer</SelectItem>
                  <SelectItem value="poupanca">Poupança</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="data" className="text-sm font-medium">Data</label>
              <Input
                id="data"
                type="date"
                value={transactionForm.data_transacao}
                onChange={(e) => setTransactionForm({...transactionForm, data_transacao: e.target.value})}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para adicionar meta */}
      <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Meta Financeira</DialogTitle>
            <DialogDescription>
              Defina uma nova meta para economizar dinheiro.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">Título</label>
              <Input
                id="titulo"
                value={goalForm.titulo}
                onChange={(e) => setGoalForm({...goalForm, titulo: e.target.value})}
                placeholder="Ex: Comprar um notebook"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">Descrição (opcional)</label>
              <Input
                id="descricao"
                value={goalForm.descricao}
                onChange={(e) => setGoalForm({...goalForm, descricao: e.target.value})}
                placeholder="Detalhes sobre sua meta"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valor_alvo" className="text-sm font-medium">Valor alvo (R$)</label>
              <Input
                id="valor_alvo"
                type="number"
                step="0.01"
                min="0"
                value={goalForm.valor_alvo}
                onChange={(e) => setGoalForm({...goalForm, valor_alvo: e.target.value})}
                placeholder="0,00"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valor_atual" className="text-sm font-medium">Valor atual (R$)</label>
              <Input
                id="valor_atual"
                type="number"
                step="0.01"
                min="0"
                value={goalForm.valor_atual}
                onChange={(e) => setGoalForm({...goalForm, valor_atual: e.target.value})}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="data_alvo" className="text-sm font-medium">Data alvo</label>
              <Input
                id="data_alvo"
                type="date"
                value={goalForm.data_alvo}
                onChange={(e) => setGoalForm({...goalForm, data_alvo: e.target.value})}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
