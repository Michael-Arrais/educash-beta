
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeDollarSign, AlertTriangle, ChartBarIcon, TrendingDown } from "lucide-react";
import { ChartBar } from "lucide-react";

interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data_transacao: string;
}

interface SpendingInsightsProps {
  transactions: Transaction[];
  balance: number;
}

export function SpendingInsights({ transactions, balance }: SpendingInsightsProps) {
  // Calculate insights
  const generateInsights = () => {
    const insights = [];
    
    // Low balance alert (if balance is below 300)
    if (balance < 300) {
      insights.push({
        type: "alert",
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
        title: "Alerta de Saldo Baixo",
        description: "Seu saldo está abaixo de R$ 300,00. Considere revisar seus gastos."
      });
    }
    
    // Get recent expenses
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const recentExpenses = transactions.filter(t => 
      t.tipo === "despesa" && new Date(t.data_transacao) >= lastMonth
    );
    
    // Check for high spending in a category
    const categoryTotals = recentExpenses.reduce((acc, transaction) => {
      acc[transaction.categoria] = (acc[transaction.categoria] || 0) + transaction.valor;
      return acc;
    }, {} as Record<string, number>);
    
    // Find the highest spending category
    let highestCategory = "";
    let highestAmount = 0;
    
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > highestAmount) {
        highestAmount = amount;
        highestCategory = category;
      }
    });
    
    if (highestCategory && highestAmount > 500) {
      insights.push({
        type: "insight",
        icon: <ChartBar className="h-4 w-4 text-amber-500" />,
        title: "Categoria com Alto Gasto",
        description: `Você gastou R$ ${highestAmount.toFixed(2)} em ${highestCategory} no último mês.`
      });
    }
    
    // Check spending trend
    if (recentExpenses.length > 5) {
      const totalExpense = recentExpenses.reduce((sum, t) => sum + t.valor, 0);
      const avgExpense = totalExpense / recentExpenses.length;
      
      // Check if any recent transaction is significantly higher than average
      const highTransactions = recentExpenses.filter(t => t.valor > avgExpense * 1.5);
      
      if (highTransactions.length > 0) {
        insights.push({
          type: "tip",
          icon: <TrendingDown className="h-4 w-4 text-blue-500" />,
          title: "Dica de Economia",
          description: "Você tem alguns gastos acima da média. Revisar esses itens pode ajudar a economizar."
        });
      }
    }
    
    return insights.length > 0 ? insights : [{
      type: "default",
      icon: <BadgeDollarSign className="h-4 w-4 text-green-500" />,
      title: "Finanças Equilibradas",
      description: "Continue mantendo o controle dos seus gastos."
    }];
  };

  const insights = generateInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Insights Financeiros</CardTitle>
        <CardDescription>Sugestões personalizadas baseadas no seu perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <Alert key={index} variant={insight.type === "alert" ? "destructive" : "default"} className={
            insight.type === "alert" 
              ? "border-red-500/50 bg-red-500/10" 
              : insight.type === "tip" 
                ? "border-blue-500/50 bg-blue-500/10"
                : insight.type === "insight"
                  ? "border-amber-500/50 bg-amber-500/10"
                  : ""
          }>
            <div className="flex items-center gap-2">
              {insight.icon}
              <AlertTitle>{insight.title}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">{insight.description}</AlertDescription>
          </Alert>
        ))}

        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-medium mb-2">Relatórios Programados</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-gray-100">Relatório Bimestral: Em 15 dias</Badge>
            <Badge variant="outline" className="bg-gray-100">Relatório Anual: Em 3 meses</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
