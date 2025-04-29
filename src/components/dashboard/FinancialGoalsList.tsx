
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import UpdateGoalDialog from "./UpdateGoalDialog";

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
  onUpdateGoal: (goalId: string, updatedValue: number) => Promise<void>;
}

export const FinancialGoalsList = ({ goals, onUpdateGoal }: FinancialGoalsListProps) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const openUpdateDialog = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsUpdateDialogOpen(true);
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Você ainda não possui metas financeiras.</p>
        <p className="text-gray-500 mt-1">Crie sua primeira meta clicando em "Nova Meta".</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progressPercent = (goal.valor_atual / goal.valor_alvo) * 100;
        return (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader className="py-4">
              <CardTitle className="text-lg">{goal.titulo}</CardTitle>
              {goal.descricao && <CardDescription>{goal.descricao}</CardDescription>}
            </CardHeader>
            <CardContent className="pb-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progresso ({progressPercent.toFixed(0)}%)</span>
                  <span>
                    R$ {goal.valor_atual.toFixed(2)} de R$ {goal.valor_alvo.toFixed(2)}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Meta para: {formatDate(goal.data_alvo)}</span>
                <span>
                  Faltam: R$ {(goal.valor_alvo - goal.valor_atual).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={() => openUpdateDialog(goal)}
                variant="secondary"
                className="w-full"
              >
                Atualizar Valor
              </Button>
            </CardContent>
          </Card>
        );
      })}

      {selectedGoal && (
        <UpdateGoalDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          goalId={selectedGoal.id}
          currentValue={selectedGoal.valor_atual}
          targetValue={selectedGoal.valor_alvo}
          title={selectedGoal.titulo}
          onUpdateGoal={onUpdateGoal}
        />
      )}
    </div>
  );
};
