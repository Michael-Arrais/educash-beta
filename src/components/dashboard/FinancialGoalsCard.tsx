
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FinancialGoalsList } from "./FinancialGoalsList";
import AddFinancialGoalDialog from "./AddFinancialGoalDialog";

interface Goal {
  id: string;
  titulo: string;
  descricao: string;
  valor_atual: number;
  valor_alvo: number;
  data_alvo: string;
}

interface FinancialGoalsCardProps {
  goals: Goal[];
  onAddGoal: (newGoal: Omit<Goal, "id">) => Promise<void>;
  onUpdateGoal: (goalId: string, updatedValue: number) => Promise<void>;
}

const FinancialGoalsCard = ({ goals, onAddGoal, onUpdateGoal }: FinancialGoalsCardProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Meu Pé-de-meia</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Nova Meta
        </Button>
        <AddFinancialGoalDialog 
          isOpen={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)} 
          onAddGoal={onAddGoal}
        />
      </CardHeader>
      <CardContent>
        <FinancialGoalsList goals={goals} onUpdateGoal={onUpdateGoal} />
      </CardContent>
    </Card>
  );
};

export default FinancialGoalsCard;
