
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UpdateGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  currentValue: number;
  targetValue: number;
  title: string;
  onUpdateGoal: (goalId: string, newValue: number) => Promise<void>;
}

const UpdateGoalDialog = ({
  isOpen,
  onClose,
  goalId,
  currentValue,
  targetValue,
  title,
  onUpdateGoal,
}: UpdateGoalDialogProps) => {
  const [value, setValue] = useState(currentValue.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newValue = parseFloat(value);
    
    if (isNaN(newValue) || newValue < 0) {
      toast.error("Por favor, insira um valor válido");
      return;
    }
    
    if (newValue > targetValue) {
      toast.error("O valor atual não pode ser maior que o valor alvo");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onUpdateGoal(goalId, newValue);
      toast.success("Valor atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
      toast.error("Erro ao atualizar valor. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Meta</DialogTitle>
          <DialogDescription>
            Atualize o valor atual da meta: {title}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="value">Novo valor atual (R$)</Label>
              <Input
                id="value"
                type="number"
                min="0"
                max={targetValue}
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Valor alvo: R$ {targetValue.toFixed(2)}</p>
              <p>Progresso: {((parseFloat(value) / targetValue) * 100).toFixed(1)}%</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Atualizando..." : "Atualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoalDialog;
