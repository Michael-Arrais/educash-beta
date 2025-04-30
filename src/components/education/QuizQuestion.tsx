
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";

interface QuestionProps {
  question: {
    id: string;
    pergunta: string;
    opcao_a: string;
    opcao_b: string;
    opcao_c: string;
    opcao_d: string;
    resposta_correta: string;
    explicacao: string;
  };
  onAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  isLastQuestion: boolean;
  onComplete?: () => void;
}

const QuizQuestion = ({ question, onAnswer, isLastQuestion, onComplete }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === question.resposta_correta;
    setHasSubmitted(true);
    onAnswer(question.id, selectedAnswer, isCorrect);
  };
  
  const handleNext = () => {
    if (isLastQuestion && onComplete) {
      onComplete();
    } else {
      // Reset the state for the next question
      setSelectedAnswer(null);
      setHasSubmitted(false);
    }
  };
  
  const isCorrect = hasSubmitted && selectedAnswer === question.resposta_correta;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{question.pergunta}</CardTitle>
        <CardDescription>
          Escolha a melhor resposta para a pergunta acima.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={setSelectedAnswer}
          disabled={hasSubmitted}
          className="space-y-4"
        >
          {Object.entries({
            "A": question.opcao_a,
            "B": question.opcao_b,
            "C": question.opcao_c,
            "D": question.opcao_d,
          }).map(([key, value]) => (
            <div key={key} className="flex items-start space-x-2">
              <RadioGroupItem value={key} id={`option-${key}`} className="mt-1" />
              <Label
                htmlFor={`option-${key}`}
                className={`flex-grow p-3 rounded-md ${
                  hasSubmitted && key === question.resposta_correta
                    ? "bg-green-50 text-green-800"
                    : hasSubmitted && key === selectedAnswer
                    ? "bg-red-50 text-red-800"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold mr-2">{key}.</span> {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {hasSubmitted && (
          <div className={`mt-6 p-4 rounded-md ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
            <div className="flex items-start">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Resposta correta!" : "Resposta incorreta!"}
                </p>
                <p className="text-sm mt-1">{question.explicacao}</p>
                {!isCorrect && (
                  <p className="text-sm mt-1">
                    A resposta correta é: <span className="font-semibold">{question.resposta_correta}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!hasSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer}
            className="w-full md:w-auto"
          >
            Responder
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="w-full md:w-auto"
          >
            {isLastQuestion ? "Ver Resultado" : "Próxima Pergunta"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
