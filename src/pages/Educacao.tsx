
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Book, BookOpen, CheckCircle2, Film, PlayCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Educacao = () => {
  const { profile } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState({ correct: 0, total: 0, showResults: false });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Consultar quizzes disponíveis
  const { data: quizzes, isLoading: loadingQuizzes } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .order("titulo");
      
      if (error) throw error;
      return data || [];
    }
  });

  // Consultar perguntas do quiz selecionado
  const { data: questions, isLoading: loadingQuestions } = useQuery({
    queryKey: ["questions", activeQuiz?.id],
    queryFn: async () => {
      if (!activeQuiz?.id) return [];
      
      const { data, error } = await supabase
        .from("perguntas_quiz")
        .select("*")
        .eq("quiz_id", activeQuiz.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!activeQuiz?.id
  });

  // Iniciar um quiz
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizResult({ correct: 0, total: 0, showResults: false });
    setIsDialogOpen(true);
  };

  // Verificar resposta e avançar para a próxima pergunta
  const checkAnswer = async () => {
    if (selectedAnswer === null) return;
    
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.resposta_correta;
    
    // Registrar resposta no banco de dados
    try {
      const { error } = await supabase
        .from('respostas_quiz')
        .upsert([{
          user_id: profile.id,
          quiz_id: activeQuiz.id,
          pergunta_id: currentQ.id,
          resposta_escolhida: selectedAnswer,
          correta: isCorrect
        }]);
      
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao registrar resposta:", error);
    }
    
    // Atualizar os resultados
    setQuizResult(prev => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
    
    // Avançar para a próxima pergunta ou finalizar o quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizResult(prev => ({
        ...prev,
        showResults: true
      }));
    }
  };

  // Fechar o quiz
  const closeQuiz = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setActiveQuiz(null);
      setQuizResult({ correct: 0, total: 0, showResults: false });
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Educação Financeira</h1>
              <p className="text-gray-600">Olá, {profile?.nome || "Estudante"}! Aprenda sobre finanças pessoais e tome melhores decisões financeiras.</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <UserNav />
            </div>
          </div>

          <Tabs defaultValue="artigos" className="mb-8">
            <TabsList className="mb-8">
              <TabsTrigger value="artigos">Artigos</TabsTrigger>
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="artigos" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-2">Artigos sobre Finanças Pessoais</h2>
                <p className="text-gray-600">
                  Expanda seu conhecimento sobre educação financeira com nossos artigos selecionados.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Iniciante</Badge>
                    <CardTitle>Orçamento Pessoal: Por Onde Começar</CardTitle>
                    <CardDescription>5 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Aprenda os princípios básicos para criar e manter um orçamento pessoal efetivo, 
                      mesmo com recursos limitados.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>1.532 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Iniciante</Badge>
                    <CardTitle>Como Economizar no Dia a Dia</CardTitle>
                    <CardDescription>7 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Dicas práticas para economizar dinheiro nas atividades cotidianas, 
                      desde alimentação até transporte e lazer.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>2.145 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Intermediário</Badge>
                    <CardTitle>Metas Financeiras Inteligentes</CardTitle>
                    <CardDescription>6 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Como definir metas financeiras realistas e desenvolvendo estratégias 
                      para alcançá-las no prazo desejado.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>1.876 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Intermediário</Badge>
                    <CardTitle>Entendendo Juros: Amigo ou Inimigo?</CardTitle>
                    <CardDescription>8 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Uma explicação simples sobre como funcionam os juros e como eles 
                      podem trabalhar a seu favor ou contra você.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>1.654 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Avançado</Badge>
                    <CardTitle>Primeiros Passos em Investimentos</CardTitle>
                    <CardDescription>10 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Introdução ao mundo dos investimentos para adolescentes, 
                      explicando conceitos básicos e opções seguras para começar.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>1.245 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Avançado</Badge>
                    <CardTitle>Planejamento Financeiro para Estudantes</CardTitle>
                    <CardDescription>9 minutos de leitura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Estratégias de planejamento financeiro específicas para estudantes do ensino médio, 
                      pensando no futuro acadêmico e profissional.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>1.467 leituras</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Glossário Financeiro</CardTitle>
                  <CardDescription>Termos importantes para entender o mundo das finanças</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Orçamento</h3>
                      <p className="text-sm text-gray-600">
                        Planejamento que relaciona receitas, despesas e investimentos durante um período.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Juros</h3>
                      <p className="text-sm text-gray-600">
                        Valor pago pelo uso do dinheiro de terceiros ou recebido quando se empresta dinheiro.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Poupança</h3>
                      <p className="text-sm text-gray-600">
                        Parte da renda que não é gasta e é guardada para uso futuro.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Investimento</h3>
                      <p className="text-sm text-gray-600">
                        Aplicação de recursos com expectativa de obter retorno financeiro no futuro.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Inflação</h3>
                      <p className="text-sm text-gray-600">
                        Aumento generalizado dos preços de bens e serviços ao longo do tempo.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Educação Financeira</h3>
                      <p className="text-sm text-gray-600">
                        Processo de aprendizagem sobre como administrar dinheiro e tomar decisões financeiras informadas.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver glossário completo
                    <Book className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-2">Vídeos Educativos</h2>
                <p className="text-gray-600">
                  Aprenda sobre finanças pessoais através de vídeos explicativos e tutoriais.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <div className="aspect-video bg-gray-100 rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white cursor-pointer">
                        <PlayCircle className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Iniciante</Badge>
                    <CardTitle>Como Criar Seu Primeiro Orçamento</CardTitle>
                    <CardDescription>8 minutos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Neste vídeo, você aprenderá passo a passo como criar um orçamento pessoal 
                      simples e eficaz, mesmo com uma renda limitada.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Assistir vídeo
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-gray-100 rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white cursor-pointer">
                        <PlayCircle className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Iniciante</Badge>
                    <CardTitle>Os 5 Principais Erros Financeiros dos Jovens</CardTitle>
                    <CardDescription>10 minutos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Descubra quais são os erros financeiros mais comuns entre os adolescentes 
                      e como evitá-los para ter uma vida financeira mais saudável.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Assistir vídeo
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-gray-100 rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white cursor-pointer">
                        <PlayCircle className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Intermediário</Badge>
                    <CardTitle>Entendendo Juros: Matemática Financeira Básica</CardTitle>
                    <CardDescription>12 minutos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Uma explicação visual e simples sobre como funcionam os juros simples e compostos, 
                      e como eles afetam suas finanças no dia a dia.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Assistir vídeo
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-gray-100 rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white cursor-pointer">
                        <PlayCircle className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">Avançado</Badge>
                    <CardTitle>Investimentos para Jovens: Por Onde Começar</CardTitle>
                    <CardDescription>15 minutos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Este vídeo introduz conceitos básicos de investimentos de forma acessível 
                      para adolescentes, mostrando opções seguras para dar os primeiros passos.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Assistir vídeo
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mini-Curso: Finanças Pessoais para Estudantes</CardTitle>
                  <CardDescription>Série de 6 vídeos sobre o básico de educação financeira</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4 shrink-0">
                        <Film className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Aula 1: O que é educação financeira?</h3>
                        <p className="text-xs text-gray-500">8 minutos • 1.240 visualizações</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <PlayCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4 shrink-0">
                        <Film className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Aula 2: Criando um orçamento pessoal</h3>
                        <p className="text-xs text-gray-500">10 minutos • 986 visualizações</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <PlayCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-4 shrink-0">
                        <Film className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Aula 3: Economizando seu dinheiro</h3>
                        <p className="text-xs text-gray-500">9 minutos • 854 visualizações</p>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-auto">
                        <PlayCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">Ver curso completo</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quizzes" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-2">Quizzes Educativos</h2>
                <p className="text-gray-600">
                  Teste seus conhecimentos sobre finanças pessoais com nossos quizzes interativos.
                </p>
              </div>
              
              {loadingQuizzes ? (
                <div className="flex justify-center p-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes?.length > 0 ? (
                    quizzes.map((quiz) => (
                      <Card key={quiz.id}>
                        <CardHeader>
                          <Badge className="w-fit mb-2" variant="outline">
                            {quiz.nivel === "iniciante" ? "Iniciante" : 
                             quiz.nivel === "intermediário" ? "Intermediário" : "Avançado"}
                          </Badge>
                          <CardTitle>{quiz.titulo}</CardTitle>
                          <CardDescription>{quiz.descricao || "Quiz educativo sobre conceitos financeiros"}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Dificuldade</span>
                              <span className="font-medium">
                                {quiz.nivel === "iniciante" ? "Iniciante" : 
                                 quiz.nivel === "intermediário" ? "Intermediário" : "Avançado"}
                              </span>
                            </div>
                            <Progress value={
                              quiz.nivel === "iniciante" ? 33 : 
                              quiz.nivel === "intermediário" ? 66 : 100
                            } className="h-2" />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => startQuiz(quiz)}>
                            Iniciar Quiz
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="lg:col-span-3 p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                      <p className="mb-4">Nenhum quiz disponível no momento.</p>
                      <p>Novos quizzes serão adicionados em breve!</p>
                    </div>
                  )}
                </div>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Como os Quizzes Funcionam</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                        <span className="font-bold">1</span>
                      </div>
                      <h3 className="font-medium mb-2">Escolha um Quiz</h3>
                      <p className="text-sm text-gray-600">
                        Selecione um quiz de acordo com seu nível de conhecimento em finanças pessoais.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                        <span className="font-bold">2</span>
                      </div>
                      <h3 className="font-medium mb-2">Responda as Perguntas</h3>
                      <p className="text-sm text-gray-600">
                        Cada quiz contém perguntas de múltipla escolha sobre conceitos financeiros.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                        <span className="font-bold">3</span>
                      </div>
                      <h3 className="font-medium mb-2">Receba o Feedback</h3>
                      <p className="text-sm text-gray-600">
                        Ao final, você verá seu desempenho e explicações sobre os conceitos abordados.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Modal do Quiz */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {activeQuiz && !quizResult.showResults ? (
            <>
              <DialogHeader>
                <DialogTitle>{activeQuiz.titulo}</DialogTitle>
                <DialogDescription>
                  Pergunta {currentQuestion + 1} de {questions?.length || 0}
                </DialogDescription>
              </DialogHeader>
              
              {loadingQuestions ? (
                <div className="flex justify-center p-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : questions && questions.length > 0 ? (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion]?.pergunta}</h3>
                  <RadioGroup 
                    value={selectedAnswer} 
                    onValueChange={setSelectedAnswer}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                      <RadioGroupItem value="A" id="option-a" />
                      <Label htmlFor="option-a" className="flex-grow cursor-pointer">
                        {questions[currentQuestion]?.opcao_a}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                      <RadioGroupItem value="B" id="option-b" />
                      <Label htmlFor="option-b" className="flex-grow cursor-pointer">
                        {questions[currentQuestion]?.opcao_b}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                      <RadioGroupItem value="C" id="option-c" />
                      <Label htmlFor="option-c" className="flex-grow cursor-pointer">
                        {questions[currentQuestion]?.opcao_c}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                      <RadioGroupItem value="D" id="option-d" />
                      <Label htmlFor="option-d" className="flex-grow cursor-pointer">
                        {questions[currentQuestion]?.opcao_d}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                <div className="flex justify-center p-8 text-gray-500">
                  <p>Nenhuma pergunta disponível para este quiz.</p>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={closeQuiz}>
                  Cancelar
                </Button>
                <Button 
                  onClick={checkAnswer}
                  disabled={selectedAnswer === null || !questions || questions.length === 0}
                >
                  Responder
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Resultado do Quiz</DialogTitle>
                <DialogDescription>
                  Você acertou {quizResult.correct} de {quizResult.total} perguntas
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-6 text-center">
                  {quizResult.correct / quizResult.total >= 0.7 ? (
                    <div className="inline-flex flex-col items-center">
                      <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
                      <p className="text-lg font-semibold text-green-600">Parabéns!</p>
                      <p className="text-gray-600">
                        Você tem um bom entendimento sobre este tópico!
                      </p>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col items-center">
                      <XCircle className="h-16 w-16 text-orange-500 mb-2" />
                      <p className="text-lg font-semibold text-orange-600">Continue aprendendo!</p>
                      <p className="text-gray-600">
                        Que tal revisar este tópico nos nossos artigos e vídeos?
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Seu desempenho</span>
                    <span className="font-medium">
                      {Math.round((quizResult.correct / quizResult.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(quizResult.correct / quizResult.total) * 100} 
                    className="h-2"
                    indicatorClassName={
                      quizResult.correct / quizResult.total >= 0.7 
                        ? "bg-green-500" 
                        : "bg-orange-500"
                    }
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={closeQuiz}>
                  Fechar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Reiniciar o quiz
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setQuizResult({ correct: 0, total: 0, showResults: false });
                  }}
                >
                  Tentar Novamente
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Educacao;
