
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTransactionCardProps {
  onAddTransaction: (transaction: any) => Promise<void>;
}

export const AddTransactionCard = ({ onAddTransaction }: AddTransactionCardProps) => {
  const [newTransaction, setNewTransaction] = useState({
    descricao: "",
    valor: 0,
    tipo: "despesa",
    categoria: "alimentacao",
    data_transacao: new Date().toISOString().split("T")[0],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Transação</CardTitle>
        <CardDescription>Registre uma nova receita ou despesa.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Transação</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Transação</DialogTitle>
              <DialogDescription>
                Registre uma nova receita ou despesa para acompanhar seu orçamento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Input
                  type="text"
                  id="description"
                  value={newTransaction.descricao}
                  onChange={(e) => setNewTransaction({ ...newTransaction, descricao: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Valor
                </Label>
                <Input
                  type="number"
                  id="value"
                  value={newTransaction.valor}
                  onChange={(e) => setNewTransaction({ ...newTransaction, valor: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select value={newTransaction.tipo} onValueChange={(value) => setNewTransaction({ ...newTransaction, tipo: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Select value={newTransaction.categoria} onValueChange={(value) => setNewTransaction({ ...newTransaction, categoria: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="lazer">Lazer</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="col-span-3 pl-3 text-left font-normal"
                    >
                      {newTransaction.data_transacao ? (
                        format(new Date(newTransaction.data_transacao), "PPP")
                      ) : (
                        <span>Selecione a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center" side="bottom">
                    <Calendar
                      mode="single"
                      selected={newTransaction.data_transacao ? new Date(newTransaction.data_transacao) : undefined}
                      onSelect={(date) => setNewTransaction({ ...newTransaction, data_transacao: date?.toISOString().split("T")[0] || "" })}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => onAddTransaction(newTransaction)}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
