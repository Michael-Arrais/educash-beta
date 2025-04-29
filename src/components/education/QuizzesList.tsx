
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import QuizCard from "./QuizCard";

interface Quiz {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
}

const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setQuizzes(data || []);
      } catch (error) {
        console.error("Erro ao buscar quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">Nenhum quiz disponível no momento.</h3>
        <p className="text-gray-500">Volte em breve para novas adições!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          id={quiz.id}
          title={quiz.titulo}
          description={quiz.descricao}
          level={quiz.nivel}
        />
      ))}
    </div>
  );
};

export default QuizzesList;
