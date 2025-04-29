
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Eu sou o FinAI, seu assistente financeiro. Como posso te ajudar hoje?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      const lowerMessage = message.toLowerCase();

      const intents = [
        {
          keywords: ["organizar financeiramente", "como me organizar", "organização financeira"],
          response: "📊 Uma boa organização financeira começa com o controle de gastos fixos e variáveis. Monte uma planilha simples, defina metas mensais e reserve uma parte para emergências."
        },
        {
          keywords: ["poupar", "guardar dinheiro", "como economizar"],
          response: "💡 Para poupar melhor, comece anotando seus gastos, defina um valor fixo para economizar todo mês e evite compras por impulso. Automatize sua poupança se possível."
        },
        {
          keywords: ["estratégias", "melhor organização", "melhorar finanças"],
          response: "🔍 Estratégias úteis incluem: uso de aplicativos de controle financeiro, revisão de gastos semanais, definição de metas SMART e priorização de dívidas com maiores juros."
        },
        {
          keywords: ["o que você pode fazer", "como você ajuda", "funções"],
          response: "🤖 Posso te ajudar com sugestões de economia, planejamento de metas, análise de gastos e criação de hábitos financeiros saudáveis!"
        }
      ];

      const matched = intents.find(({ keywords }) =>
        keywords.some(keyword => lowerMessage.includes(keyword))
      );

      const response = matched
        ? matched.response
        : "Desculpe, não entendi muito bem. Pode reformular sua pergunta sobre finanças?";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
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
              className={flex ${msg.role === "user" ? "justify-end" : "justify-start"}}
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
