
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  titulo: string;
  descricao: string;
  valor_atual: number;
  valor_alvo: number;
  data_alvo: string;
}

interface FinancialGoalsListProps {
  goals: Goal[];
}

export const FinancialGoalsList = ({ goals }: FinancialGoalsListProps) => {
  return (
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
  );
};
