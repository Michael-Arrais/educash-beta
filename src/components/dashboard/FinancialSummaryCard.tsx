
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FinancialSummaryProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const FinancialSummaryCard = ({ balance, totalIncome, totalExpenses }: FinancialSummaryProps) => {
  return (
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
  );
};
