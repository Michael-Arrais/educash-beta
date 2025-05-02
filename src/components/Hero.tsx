
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CashLogo from "./CashLogo";

const Hero = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16">
            <div className="flex items-center mb-4">
              <CashLogo className="w-8 h-8 text-primary mr-2" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                Inteligência Financeira com <span className="text-primary">EduCash</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Aprenda a controlar suas finanças de forma inteligente e divertida. 
              O EduCash é um assistente de IA que ajuda estudantes a administrar recursos 
              governamentais e desenvolver hábitos financeiros saudáveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button className="bg-primary hover:bg-primary-600 px-8 py-6 text-lg">
                  Comece agora
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-100 px-8 py-6 text-lg">
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full bg-primary-200 rounded-2xl transform -rotate-3"></div>
              <div className="absolute -bottom-5 -right-5 w-full h-full bg-secondary-200 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white shadow-xl rounded-2xl p-6 z-10">
                <div className="bg-gray-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                      <CashLogo className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Assistente CashIA</p>
                    </div>
                  </div>
                  <p className="text-gray-800">
                    Olá! Sou o CashIA, seu assistente financeiro. Como posso ajudar você a gerenciar melhor seus recursos hoje?
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Recebimento da bolsa: <span className="font-semibold text-green-600">R$ 200,00</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9l-7 7-4-4"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Meta de poupança: <span className="font-semibold">R$ 500,00</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Tempo para atingir meta: <span className="font-semibold">3 meses</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
