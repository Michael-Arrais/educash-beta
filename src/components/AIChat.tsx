
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CashLogo from "./CashLogo";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá! Eu sou o CashIA 🤖, seu assistente financeiro. Como posso te ajudar hoje? Escolha uma opção ou digite sua pergunta:

1️⃣ Reserva de emergência
2️⃣ Como poupar com pouco dinheiro
3️⃣ Educação financeira
4️⃣ Organização do salário
5️⃣ Como sair das dívidas
6️⃣ Investimentos para iniciantes
7️⃣ Como evitar gastos por impulso
8️⃣ Planilhas e controle de gastos
9️⃣ Diferenças entre débito e crédito
🔟 Finanças para estudantes`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setMessage("");

    // Tempo de resposta variável entre 1-3 segundos para simular processamento real
    const responseTime = Math.random() * 2000 + 1000; // 1000ms a 3000ms

    setTimeout(() => {
      const lowerMessage = message.toLowerCase();

      const intents = [
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
        },
        // Novas entradas adicionadas
        {
          keywords: ["como sair das dívidas", "quero quitar dívidas", "estou endividado"],
          response: "Sair das dívidas exige planejamento. Comece organizando tudo o que deve, por valor e prioridade. Negocie prazos maiores e evite fazer novas dívidas. Tente guardar um pouco por mês para pagar aos poucos. Você pode conseguir apoio gratuito em serviços como o Serasa Limpa Nome ou Procon."
        },
        {
          keywords: ["investir com pouco", "investir pouco dinheiro", "renda fixa para iniciantes"],
          response: "Sim, é possível começar a investir com pouco! Opções como Tesouro Direto e CDBs de bancos digitais aceitam valores a partir de R$ 30. Eles são seguros e ideais para quem está começando. Antes de investir, monte sua reserva de emergência!"
        },
        {
          keywords: ["como evitar gastar", "gasto por impulso", "controle financeiro"],
          response: "Uma boa dica é esperar 24 horas antes de comprar algo por impulso. Também vale definir um limite para gastos semanais e usar dinheiro em vez de cartão, para sentir mais o valor saindo do seu bolso."
        },
        {
          keywords: ["planilha de gastos", "como montar planilha", "organizar despesas"],
          response: "Você pode usar uma planilha simples no Excel ou Google Sheets com colunas como: data, tipo de gasto, valor e observações. Registre tudo que gastar por pelo menos um mês. Assim você entende seus hábitos e pode melhorar aos poucos."
        },
        {
          keywords: ["meta financeira", "guardar para objetivo", "economizar para algo"],
          response: "Defina um objetivo claro, como 'viajar em dezembro' ou 'comprar um notebook'. Depois, veja quanto precisa guardar por mês até lá. Isso te ajuda a manter o foco e dizer não para gastos desnecessários."
        },
        {
          keywords: ["educação dos filhos", "dinheiro para filhos", "como ensinar finanças para crianças"],
          response: "Uma boa forma de ensinar é dando mesada e ajudando a criança a decidir como usar: uma parte para gastar, outra para guardar. Incentive também a pensar antes de comprar e valorizar o esforço para conquistar algo."
        },
        {
          keywords: ["débito ou crédito", "melhor pagar no débito ou crédito", "diferença débito crédito"],
          response: "No débito, o dinheiro sai na hora, o que ajuda a controlar melhor os gastos. No crédito, você paga depois — isso pode ser útil, mas exige disciplina para não estourar o orçamento e pagar juros."
        },
        {
          keywords: ["finanças para estudante", "sou estudante e quero economizar", "como poupar sendo estudante"],
          response: "Mesmo com pouca renda, dá para economizar. Use aplicativos gratuitos de controle financeiro, evite gastar com delivery e compre livros usados. Se conseguir fazer renda extra, guarde parte dela para emergências ou objetivos futuros."
        }
      ];

      // Mapeamento das opções do menu para os índices dos intents
      const menuMap: { [key: string]: number } = {
        "1": 0,    // Reserva de emergência
        "2": 1,    // Como poupar com pouco dinheiro
        "3": 2,    // Educação financeira
        "4": 3,    // Organização do salário
        "5": 10,   // Como sair das dívidas
        "6": 11,   // Investimentos para iniciantes
        "7": 12,   // Como evitar gastos por impulso
        "8": 13,   // Planilhas e controle de gastos
        "9": 16,   // Diferenças entre débito e crédito
        "10": 17   // Finanças para estudantes
      };

      // Verificar se a entrada é uma opção numérica do menu
      const trimmed = lowerMessage.trim();
      const intentIndex = menuMap[trimmed];
      
      // Verificar também por padrões como "opção 1", "quero saber sobre a 1", etc.
      const numberMatch = lowerMessage.match(/(?:opção\s*)?(\d+)|(?:sobre\s+a?\s*)?(\d+)/);
      const extractedNumber = numberMatch ? (numberMatch[1] || numberMatch[2]) : null;
      const finalIntentIndex = intentIndex !== undefined ? intentIndex : (extractedNumber ? menuMap[extractedNumber] : undefined);

      const matched = typeof finalIntentIndex === "number" ? intents[finalIntentIndex] :
        intents.find(({ keywords }) =>
          keywords.some(keyword => lowerMessage.includes(keyword))
        );

      const response = matched
        ? matched.response
        : "Desculpe, não entendi muito bem. Pode reformular sua pergunta sobre finanças? Você pode me perguntar sobre reserva de emergência, educação financeira, como poupar dinheiro e outros temas, ou escolher uma das opções numeradas do menu inicial.";

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setLoading(false);
    }, responseTime);
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
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <CashLogo className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-line ${
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
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <CashLogo className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-2 rounded-tl-none">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-600 text-sm mr-2">CashIA está digitando</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pergunte ao CashIA sobre suas finanças..."
            className="flex-1"
            disabled={loading}
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
