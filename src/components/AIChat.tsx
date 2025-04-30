
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
        },
        {
          keywords: ["reserva de emergência", "emergência", "guardar emergência"],
          response: "Uma reserva de emergência é um dinheiro guardado para situações imprevistas, como um problema de saúde ou perda de renda. O ideal é juntar de 3 a 6 meses dos seus gastos mensais. Mesmo que você comece com pouco, o importante é ter um valor guardado que te dê segurança."
        },
        {
          keywords: ["poupar pouco dinheiro", "economizar pouco", "guardar com pouco"],
          response: "O segredo é começar pequeno e ser constante. Separe uma parte do que você recebe — mesmo que seja R$ 5 ou R$ 10 por mês — e guarde em um lugar seguro, como uma conta poupança ou conta digital que renda juros. Aos poucos, esse dinheiro cresce."
        },
        {
          keywords: ["educação financeira", "aprender sobre dinheiro", "entender finanças"],
          response: "Educação financeira é aprender a cuidar bem do seu dinheiro: saber poupar, gastar com consciência e planejar o futuro. Quanto mais você entende sobre isso, mais autonomia você tem para realizar seus sonhos e evitar dívidas."
        },
        {
          keywords: ["dividir salário", "organizar dinheiro", "dividir renda"],
          response: "Uma dica simples é: 50% para o que você precisa (como transporte, alimentação), 30% para o que você quer (lazer, hobbies) e 20% para guardar (poupança ou reserva). Se não der para seguir exatamente, adapte ao que você consegue hoje."
        },
        {
          keywords: ["sonho curto prazo", "juntar dinheiro", "comprar algo"],
          response: "Primeiro, defina quanto custa o que você quer. Depois, veja quanto pode guardar por mês e em quanto tempo alcança o valor. Se possível, procure promoções e evite parcelar, para não pagar juros."
        },
        {
          keywords: ["cartão de crédito", "usar cartão", "crédito"],
          response: "Pode sim, mas é importante ter bastante cuidado. Só use o cartão se tiver certeza de que conseguirá pagar a fatura no mês seguinte. Nunca gaste mais do que pode pagar e evite o pagamento mínimo, que gera juros altos."
        },
        {
          keywords: ["juros", "juros simples", "juros composto"],
          response: "Juros é o valor extra que você paga quando empresta dinheiro ou atrasa um pagamento. Também pode ser o que você ganha quando empresta dinheiro para o banco (como na poupança). O ideal é sempre evitar pagar juros e tentar ganhar juros guardando seu dinheiro."
        },
        {
          keywords: ["orçamento mensal", "controlar gastos", "planejar dinheiro"],
          response: "Anote tudo o que você ganha e tudo o que gasta durante o mês. Divida em categorias (alimentação, transporte, lazer). Assim você entende para onde seu dinheiro vai e pode planejar melhor quanto pode guardar."
        },
        {
          keywords: ["pix", "pagamento instantâneo", "transferência pix"],
          response: "Nunca compartilhe suas senhas ou chaves PIX com estranhos. Sempre confirme os dados antes de enviar o dinheiro e desconfie de promessas de dinheiro fácil. Se tiver dúvida, pergunte para alguém de confiança ou para o banco."
        },
        {
          keywords: ["o que você pode fazer", "como você ajuda", "funções"],
          response: "🤖 Posso te ajudar com sugestões sobre reserva de emergência, como poupar dinheiro, educação financeira, organização do salário, cartão de crédito e outros temas de finanças pessoais!"
        }
      ];
<<<<<<< HEAD

      const matched = intents.find(({ keywords }) =>
        keywords.some(keyword => lowerMessage.includes(keyword))
      );

      const response = matched
        ? matched.response
        : "Desculpe, não entendi muito bem. Pode reformular sua pergunta sobre finanças?";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
=======

      const matched = intents.find(({ keywords }) =>
        keywords.some(keyword => lowerMessage.includes(keyword))
      );

      const response = matched
        ? matched.response
        : "Desculpe, não entendi muito bem. Pode reformular sua pergunta sobre finanças? Você pode me perguntar sobre reserva de emergência, educação financeira, como poupar dinheiro e outros temas.";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
>>>>>>> 144ce5d76705247586c21adb7a1720ad2019bd29
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col p-4 h-full">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[60vh]">
          {messages.map((msg, index) => (
<<<<<<< HEAD
            <div
              key={index}
              className={flex ${msg.role === "user" ? "justify-end" : "justify-start"}}
=======
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
>>>>>>> 144ce5d76705247586c21adb7a1720ad2019bd29
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
