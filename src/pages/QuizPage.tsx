
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuizQuestion from "@/components/education/QuizQuestion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Quiz {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
}

interface Question {
  id: string;
  pergunta: string;
  opcao_a: string;
  opcao_b: string;
  opcao_c: string;
  opcao_d: string;
  resposta_correta: string;
  explicacao: string;
}

interface QuizResponse {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        // Fetch the quiz
        const { data: quizData, error: quizError } = await supabase
          .from("quizzes")
          .select("*")
          .eq("id", id)
          .single();
        
        if (quizError) throw quizError;
        
        setQuiz(quizData);
        
        // Fetch the questions
        const { data: questionsData, error: questionsError } = await supabase
          .from("perguntas_quiz")
          .select("*")
          .eq("quiz_id", id);
        
        if (questionsError) throw questionsError;
        
        setQuestions(questionsData);
      } catch (error) {
        console.error("Erro ao buscar quiz:", error);
        toast.error("Erro ao carregar o quiz. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizAndQuestions();
  }, [id]);
  
  const handleAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setResponses([...responses, { questionId, answer, isCorrect }]);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizComplete();
    }
  };
  
  const handleQuizComplete = async () => {
    setQuizCompleted(true);
    
    if (user) {
      try {
        // Save the responses to the database
        const responsesToSave = responses.map(response => ({
          user_id: user.id,
          quiz_id: id,
          pergunta_id: response.questionId,
          resposta_escolhida: response.answer,
          correta: response.isCorrect
        }));
        
        const { error } = await supabase
          .from("respostas_quiz")
          .insert(responsesToSave);
        
        if (error) throw error;
        
        const score = calculateScore();
        if (score.percentage >= 70) {
          toast.success("Parabéns! Você concluiu o quiz com sucesso!");
        } else if (score.percentage >= 40) {
          toast.info("Bom trabalho! Continue praticando para melhorar.");
        } else {
          toast.error("Você pode melhorar! Que tal tentar novamente?");
        }
      } catch (error) {
        console.error("Erro ao salvar respostas:", error);
        toast.error("Erro ao salvar suas respostas. Seus resultados não foram registrados.");
      }
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setQuizCompleted(false);
  };
  
  const calculateScore = () => {
    const correctAnswers = responses.filter(r => r.isCorrect).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    };
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!quiz || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Oops! Quiz não encontrado.</h2>
              <p className="mb-6">Não foi possível encontrar o quiz solicitado ou ele não possui perguntas.</p>
              <Button onClick={() => navigate("/educacao")}>Voltar para Educação</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (quizCompleted) {
    const score = calculateScore();
    
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Resultado do Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">{quiz.titulo}</h3>
              <p className="text-sm text-gray-600 mb-6">{quiz.descricao}</p>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span>Pontuação:</span>
                  <span className="font-semibold">{score.correct} de {score.total}</span>
                </div>
                <Progress value={score.percentage} className="h-3" />
                <p className="mt-2 text-2xl font-bold">
                  {score.percentage}%
                </p>
              </div>
              
              {score.percentage >= 70 ? (
                <div className="p-4 bg-green-50 rounded-md mb-6">
                  <p className="text-green-800 font-bold">Excelente!</p>
                  <p className="text-green-700">
                    Você demonstrou um ótimo conhecimento sobre este tema.
                  </p>
                </div>
              ) : score.percentage >= 40 ? (
                <div className="p-4 bg-yellow-50 rounded-md mb-6">
                  <p className="text-yellow-800 font-bold">Bom trabalho!</p>
                  <p className="text-yellow-700">
                    Você está no caminho certo, mas ainda pode melhorar seus conhecimentos neste tema.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-md mb-6">
                  <p className="text-red-800 font-bold">Continue estudando!</p>
                  <p className="text-red-700">
                    Este tema parece desafiador para você. Recomendamos estudar mais sobre ele.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleRestartQuiz} variant="outline">
                  Refazer Quiz
                </Button>
                <Button onClick={() => navigate("/educacao")}>
                  Voltar para Educação
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">{quiz.titulo}</h2>
              <p className="text-gray-600">{quiz.descricao}</p>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-gray-600">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </CardContent>
      </Card>
      
      <QuizQuestion 
        question={currentQuestion}
        onAnswer={handleAnswer}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        onComplete={handleQuizComplete}
      />
      
      {/* Add navigation button for next question */}
      {responses.length > currentQuestionIndex && currentQuestionIndex < questions.length - 1 && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleNextQuestion}>
            Próxima Pergunta
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
