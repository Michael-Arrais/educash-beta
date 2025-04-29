
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  level: string;
}

const QuizCard = ({ id, title, description, level }: QuizCardProps) => {
  const navigate = useNavigate();
  
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "iniciante":
        return "bg-green-100 text-green-800";
      case "intermediário":
        return "bg-yellow-100 text-yellow-800";
      case "avançado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between">
          <div className={`text-xs px-2 py-1 rounded-full ${getLevelColor(level)}`}>
            {level}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => navigate(`/educacao/quiz/${id}`)} 
          className="w-full"
        >
          Iniciar Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
