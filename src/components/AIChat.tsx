
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
}

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Eu sou o FinAI, seu assistente financeiro. Como posso te ajudar hoje?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Adiciona a mensagem do usuário ao chat
    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setMessage("");
    
    // Simula uma resposta do assistente (em um app real, isso seria uma chamada à API)
    setTimeout(() => {
      const responses = [
        "Entendi! Considerando seus gastos recentes, recomendo economizar pelo menos 20% do seu auxílio mensal para atingir sua meta.",
        "Baseado no seu histórico, você está no caminho certo para atingir sua meta de poupança. Continue assim!",
        "Se você continuar com esse padrão de economia, poderá atingir sua meta em aproximadamente 3 meses.",
        "Para economizar mais, considere reduzir gastos com lanches e entretenimento. Isso pode aumentar sua poupança em até 30%.",
        "Analisando suas finanças, posso sugerir que você crie um fundo de emergência antes de começar a gastar em itens não essenciais."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col p-4 h-full">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[60vh]">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pergunte ao FinAI sobre suas finanças..."
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !message.trim()}>
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChat;
