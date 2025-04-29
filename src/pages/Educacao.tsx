
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizzesList from "@/components/education/QuizzesList";

const Educacao = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <h1 className="text-3xl font-bold mb-6">Educação Financeira</h1>
      
      <Tabs defaultValue="quizzes">
        <TabsList>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="articles">Artigos</TabsTrigger>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quizzes" className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Teste seus conhecimentos</h2>
            <p className="text-gray-600">
              Avalie seu conhecimento financeiro e aprenda novos conceitos com nossos quizzes interativos.
            </p>
          </div>
          <QuizzesList />
        </TabsContent>
        
        <TabsContent value="articles" className="mt-6">
          <div className="text-center p-12">
            <h3 className="text-lg font-medium">Conteúdo em breve!</h3>
            <p className="text-gray-500">
              Estamos preparando artigos informativos sobre educação financeira.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <div className="text-center p-12">
            <h3 className="text-lg font-medium">Conteúdo em breve!</h3>
            <p className="text-gray-500">
              Estamos preparando vídeos educativos sobre finanças pessoais.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Educacao;
