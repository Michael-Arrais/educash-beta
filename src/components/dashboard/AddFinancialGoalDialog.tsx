
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";

interface AddFinancialGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: {
    titulo: string;
    descricao: string;
    valor_atual: number;
    valor_alvo: number;
    data_alvo: string;
  }) => Promise<void>;
}

const AddFinancialGoalDialog = ({
  isOpen,
  onClose,
  onAddGoal,
}: AddFinancialGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetValue || !targetDate) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddGoal({
        titulo: title,
        descricao: description,
        valor_atual: parseFloat(currentValue) || 0,
        valor_alvo: parseFloat(targetValue),
        data_alvo: targetDate,
      });

      toast.success("Meta financeira criada com sucesso!");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Erro ao criar meta financeira:", error);
      toast.error("Erro ao criar meta financeira. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCurrentValue("");
    setTargetValue("");
    setTargetDate("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Meta</DialogTitle>
          <DialogDescription>
            Crie uma nova meta financeira para acompanhar seu progresso.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Meta*</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Comprar um carro"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua meta financeira..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Valor Atual (R$)</Label>
              <Input
                id="currentValue"
                type="number"
                min="0"
                step="0.01"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetValue">Valor Alvo (R$)*</Label>
              <Input
                id="targetValue"
                type="number"
                min="0.01"
                step="0.01"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="1000,00"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Data Alvo*</Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              required
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFinancialGoalDialog;
