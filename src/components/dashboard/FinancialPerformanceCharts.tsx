
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CalendarCheck } from "lucide-react";

interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data_transacao: string;
}

interface ChartProps {
  transactions: Transaction[];
}

export function FinancialPerformanceCharts({ transactions }: ChartProps) {
  const [timeframe, setTimeframe] = useState<"month" | "quarter" | "year">("month");

  // Prepare data for charts
  const prepareChartData = () => {
    // Group transactions by category for expense distribution
    const categoryMap = new Map<string, number>();
    transactions
      .filter(t => t.tipo === "despesa")
      .forEach(t => {
        const current = categoryMap.get(t.categoria) || 0;
        categoryMap.set(t.categoria, current + t.valor);
      });

    const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    // Group transactions by month for income/expense trends
    const monthlyData = new Map<string, { month: string, receitas: number, despesas: number }>();
    
    // Get date range based on timeframe
    const today = new Date();
    let startDate = new Date();
    
    if (timeframe === "month") {
      startDate.setMonth(today.getMonth() - 1);
    } else if (timeframe === "quarter") {
      startDate.setMonth(today.getMonth() - 3);
    } else {
      startDate.setFullYear(today.getFullYear() - 1);
    }
    
    transactions.forEach(t => {
      const date = new Date(t.data_transacao);
      if (date >= startDate) {
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const monthName = date.toLocaleString('pt-BR', { month: 'short' });
        
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { 
            month: monthName, 
            receitas: 0, 
            despesas: 0 
          });
        }
        
        const entry = monthlyData.get(monthKey)!;
        if (t.tipo === "receita") {
          entry.receitas += t.valor;
        } else {
          entry.despesas += t.valor;
        }
      }
    });

    const monthlyChartData = Array.from(monthlyData.values())
      .sort((a, b) => a.month.localeCompare(b.month));

    return { categoryData, monthlyChartData };
  };

  const { categoryData, monthlyChartData } = prepareChartData();
  
  // Random colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Config for the charts
  const chartConfig = {
    receitas: {
      label: "Receitas",
      theme: {
        light: "#10b981",
        dark: "#10b981",
      },
    },
    despesas: {
      label: "Despesas",
      theme: {
        light: "#ef4444",
        dark: "#ef4444",
      },
    },
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Desempenho Financeiro
        </CardTitle>
        <Tabs 
          value={timeframe} 
          onValueChange={(v) => setTimeframe(v as "month" | "quarter" | "year")}
          className="w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="month" className="text-xs px-2">Mês</TabsTrigger>
            <TabsTrigger value="quarter" className="text-xs px-2">Trimestre</TabsTrigger>
            <TabsTrigger value="year" className="text-xs px-2">Ano</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Income vs Expenses Chart */}
          <div className="bg-card rounded-lg border p-4">
            <div className="font-medium mb-2 flex items-center">
              <CalendarCheck className="h-4 w-4 mr-1" />
              <span>Receitas vs Despesas</span>
            </div>
            <div className="h-[240px]">
              {monthlyChartData.length > 0 ? (
                <ChartContainer
                  config={chartConfig}
                  className="h-[240px]"
                >
                  <BarChart data={monthlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="receitas" name="receitas" fill="var(--color-receitas)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="despesas" name="despesas" fill="var(--color-despesas)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Sem dados suficientes para exibir o gráfico
                </div>
              )}
            </div>
          </div>
          
          {/* Expense Categories Chart */}
          <div className="bg-card rounded-lg border p-4">
            <div className="font-medium mb-2">Distribuição de Despesas</div>
            <div className="h-[240px]">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Sem despesas registradas
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
