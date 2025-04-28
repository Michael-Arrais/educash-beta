
import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("overview");

  // Dados de exemplo para os gráficos
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  
  const balanceData = {
    labels: months,
    datasets: [
      {
        label: 'Saldo',
        data: [200, 380, 520, 480, 650, 800],
        borderColor: '#9b87f5',
        backgroundColor: 'rgba(155, 135, 245, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };
  
  const expensesData = {
    labels: months,
    datasets: [
      {
        label: 'Receitas',
        data: [200, 200, 200, 200, 200, 200],
        backgroundColor: 'rgba(30, 174, 219, 0.7)',
      },
      {
        label: 'Despesas',
        data: [20, 20, 60, 120, 50, 50],
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
      }
    ]
  };
  
  const categoryData = {
    labels: ['Alimentação', 'Transporte', 'Material Escolar', 'Lazer', 'Poupança'],
    datasets: [
      {
        data: [30, 20, 25, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
      }
    ]
  };

  // Transações de exemplo
  const transactions = [
    { id: 1, description: 'Recebimento do Auxílio', amount: 200, type: 'income', date: '15/06/2024' },
    { id: 2, description: 'Lanche na Cantina', amount: -10, type: 'expense', date: '16/06/2024' },
    { id: 3, description: 'Material Escolar', amount: -25, type: 'expense', date: '18/06/2024' },
    { id: 4, description: 'Transporte', amount: -15, type: 'expense', date: '20/06/2024' },
    { id: 5, description: 'Poupança', amount: -50, type: 'savings', date: '22/06/2024' },
  ];

  // Metas de exemplo
  const goals = [
    { id: 1, title: 'Notebook para estudos', target: 1200, current: 300, deadline: '12/2024' },
    { id: 2, title: 'Curso de programação', target: 400, current: 150, deadline: '09/2024' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Financeiro</h1>
              <p className="text-gray-600">Olá, João! Aqui está o resumo das suas finanças.</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button className="bg-primary hover:bg-primary-600">
                Adicionar Transação
              </Button>
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
                <div className="text-2xl font-bold text-gray-800">R$ 800,00</div>
                <p className="text-xs text-green-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  23% desde o mês passado
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
                <div className="text-2xl font-bold text-gray-800">R$ 200,00</div>
                <p className="text-xs text-gray-500">Último recebimento: 15/06</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Despesas (Mês)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">R$ 50,00</div>
                <p className="text-xs text-red-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  10% desde o mês passado
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
                <div className="text-2xl font-bold text-gray-800">25%</div>
                <p className="text-xs text-gray-500">Meta: 30%</p>
                <Progress value={75} className="h-1 mt-2" />
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
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Receitas vs. Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
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
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                          <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? `+R$ ${transaction.amount}` : `-R$ ${Math.abs(transaction.amount)}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
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
                          <li>Você atingirá sua meta do notebook em aproximadamente 10 meses</li>
                          <li>Se aumentar sua economia em 5% por mês, você atingirá a meta em 8 meses</li>
                          <li>Se continuar economizando 25% do seu auxílio, terá R$ 1.400 ao final do ensino médio</li>
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
                <CardHeader>
                  <CardTitle>Histórico de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="p-3 font-medium">Descrição</th>
                          <th className="p-3 font-medium">Data</th>
                          <th className="p-3 font-medium text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-t">
                            <td className="p-3">{transaction.description}</td>
                            <td className="p-3 text-sm text-gray-500">{transaction.date}</td>
                            <td className={`p-3 text-right font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? `+R$ ${transaction.amount}` : `-R$ ${Math.abs(transaction.amount)}`}
                            </td>
                          </tr>
                        ))}
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
                      <CardTitle>{goal.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">Progresso</p>
                          <p className="text-sm font-medium">{Math.round((goal.current / goal.target) * 100)}%</p>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <p>R$ {goal.current} de R$ {goal.target}</p>
                          <p className="text-gray-500">Meta: {goal.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-gray-50 border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="font-medium">Adicionar Nova Meta</p>
                  </div>
                </Card>
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
    </div>
  );
};

export default Dashboard;
