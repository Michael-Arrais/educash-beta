
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CashLogo from "@/components/CashLogo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimoials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">O que nossos usuários dizem</h2>
              <p className="text-gray-600">
                Veja como o EduCash tem ajudado estudantes a desenvolver habilidades financeiras e
                planejar melhor seu futuro.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary font-bold">
                    JP
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">João Pedro, 17 anos</h4>
                    <p className="text-sm text-gray-500">3º ano do Ensino Médio</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "O EduCash me ajudou a criar um plano para economizar para meu curso técnico. Agora sei exatamente quanto preciso guardar por mês!"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary-200 rounded-full flex items-center justify-center text-secondary font-bold">
                    AM
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ana Maria, 16 anos</h4>
                    <p className="text-sm text-gray-500">2º ano do Ensino Médio</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Consegui entender como funcionam os juros e comecei a poupar uma parte do meu auxílio. A EduCash me dá dicas super úteis!"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-200 rounded-full flex items-center justify-center text-accent font-bold">
                    LF
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Luís Felipe, 15 anos</h4>
                    <p className="text-sm text-gray-500">1º ano do Ensino Médio</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Antes eu gastava todo meu dinheiro sem pensar, mas o EduCash me ensinou a controlar melhor meus gastos e agora estou juntando para comprar um notebook."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mascot Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Conheça o CashIA, seu assistente financeiro
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Nosso mascote inteligente está aqui para te ajudar a entender melhor o mundo das finanças.
                  Com dicas personalizadas e linguagem simples, o CashIA torna o aprendizado financeiro divertido e acessível.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="/login" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                    Conversar com CashIA
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <img 
                  src="/lovable-uploads/4b7b65eb-2aa5-4255-8076-0f860da30b28.png" 
                  alt="CashIA - Mascote do EduCash"
                  className="w-80 h-80 object-contain"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 gradient-bg text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Comece a construir seu futuro financeiro hoje</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Junte-se aos milhares de estudantes que já estão aprendendo a administrar 
              melhor seus recursos e criar hábitos financeiros saudáveis.
            </p>
            <a href="/login" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Criar uma conta gratuita
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
