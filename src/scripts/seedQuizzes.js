
import { supabase } from "../integrations/supabase/client";

export async function seedQuizzes() {
  try {
    console.log("Iniciando a inserção de quizzes de exemplo...");

    // Verificar se já existem quizzes
    const { data: existingQuizzes } = await supabase
      .from('quizzes')
      .select('id')
      .limit(1);
    
    if (existingQuizzes && existingQuizzes.length > 0) {
      console.log("Quizzes já existem no banco de dados. Pulando seed.");
      return;
    }

    // Criar quizzes
    const { data: quizBasico, error: quizBasicoError } = await supabase
      .from('quizzes')
      .insert({
        titulo: "Conceitos Básicos de Finanças",
        descricao: "Teste seus conhecimentos sobre conceitos financeiros fundamentais",
        nivel: "iniciante"
      })
      .select();

    if (quizBasicoError) throw quizBasicoError;

    const { data: quizOrcamento, error: quizOrcamentoError } = await supabase
      .from('quizzes')
      .insert({
        titulo: "Orçamento e Planejamento",
        descricao: "Avalie seu conhecimento sobre orçamento pessoal e planejamento financeiro",
        nivel: "intermediário"
      })
      .select();

    if (quizOrcamentoError) throw quizOrcamentoError;

    const { data: quizInvestimentos, error: quizInvestimentosError } = await supabase
      .from('quizzes')
      .insert({
        titulo: "Introdução aos Investimentos",
        descricao: "Descubra o quanto você sabe sobre investimentos básicos",
        nivel: "avançado"
      })
      .select();

    if (quizInvestimentosError) throw quizInvestimentosError;

    // Adicionar perguntas aos quizzes
    const perguntasBasico = [
      {
        quiz_id: quizBasico[0].id,
        pergunta: "O que é educação financeira?",
        opcao_a: "Aprender a ganhar muito dinheiro rapidamente",
        opcao_b: "Conhecimentos e habilidades para tomar decisões financeiras conscientes",
        opcao_c: "Estudar para se tornar um banqueiro profissional",
        opcao_d: "Aprender apenas sobre como investir na bolsa de valores",
        resposta_correta: "B",
        explicacao: "Educação financeira é o processo de adquirir conhecimentos e habilidades para tomar decisões financeiras informadas e conscientes."
      },
      {
        quiz_id: quizBasico[0].id,
        pergunta: "O que significa 'receita'?",
        opcao_a: "Qualquer gasto com alimentação",
        opcao_b: "O dinheiro que sobra no fim do mês",
        opcao_c: "Todo dinheiro que entra, como salário ou mesada",
        opcao_d: "Os juros de um investimento",
        resposta_correta: "C",
        explicacao: "Receita é todo dinheiro que entra, como salário, mesadas, presentes em dinheiro, etc."
      },
      {
        quiz_id: quizBasico[0].id,
        pergunta: "O que é um orçamento pessoal?",
        opcao_a: "Uma lista de desejos de compra",
        opcao_b: "Um plano que compara receitas e despesas",
        opcao_c: "O limite de gastos do cartão de crédito",
        opcao_d: "O valor total economizado no mês",
        resposta_correta: "B",
        explicacao: "Um orçamento pessoal é um plano financeiro que compara receitas e despesas, ajudando a controlar as finanças."
      }
    ];

    const perguntasOrcamento = [
      {
        quiz_id: quizOrcamento[0].id,
        pergunta: "Qual é a recomendação sobre quanto da renda mensal deve-se poupar?",
        opcao_a: "5%",
        opcao_b: "10%",
        opcao_c: "20%",
        opcao_d: "50%",
        resposta_correta: "C",
        explicacao: "Especialistas recomendam poupar pelo menos 20% da renda mensal para criar uma reserva financeira adequada."
      },
      {
        quiz_id: quizOrcamento[0].id,
        pergunta: "O que é uma despesa fixa?",
        opcao_a: "Gastos que ocorrem todos os meses com o mesmo valor",
        opcao_b: "Gastos com lazer e diversão",
        opcao_c: "Despesas que surgem de forma inesperada",
        opcao_d: "Qualquer gasto realizado com dinheiro em espécie",
        resposta_correta: "A",
        explicacao: "Despesas fixas são aquelas que ocorrem todos os meses com valores praticamente iguais, como aluguel, mensalidades, etc."
      },
      {
        quiz_id: quizOrcamento[0].id,
        pergunta: "Qual a principal vantagem de ter um orçamento?",
        opcao_a: "Poder gastar todo o dinheiro sem se preocupar",
        opcao_b: "Ter controle sobre suas finanças e tomar decisões conscientes",
        opcao_c: "Impressionar amigos e familiares",
        opcao_d: "Evitar trabalhar com números e matemática",
        resposta_correta: "B",
        explicacao: "A principal vantagem de ter um orçamento é ter controle sobre suas finanças, saber para onde vai seu dinheiro e poder tomar decisões financeiras conscientes."
      }
    ];

    const perguntasInvestimentos = [
      {
        quiz_id: quizInvestimentos[0].id,
        pergunta: "O que são juros compostos?",
        opcao_a: "Juros que incidem apenas sobre o valor principal",
        opcao_b: "Juros que incidem sobre o valor principal mais os juros acumulados",
        opcao_c: "Uma taxa de juros criada pelo governo",
        opcao_d: "A soma de todas as taxas bancárias",
        resposta_correta: "B",
        explicacao: "Juros compostos são aqueles que incidem não apenas sobre o valor principal, mas também sobre os juros acumulados em períodos anteriores."
      },
      {
        quiz_id: quizInvestimentos[0].id,
        pergunta: "O que é inflação?",
        opcao_a: "O aumento do salário mínimo",
        opcao_b: "A diminuição do valor da moeda",
        opcao_c: "O aumento generalizado e contínuo dos preços",
        opcao_d: "O valor dos impostos cobrados pelo governo",
        resposta_correta: "C",
        explicacao: "Inflação é o aumento generalizado e contínuo dos preços, que resulta na perda do poder de compra da moeda."
      },
      {
        quiz_id: quizInvestimentos[0].id,
        pergunta: "Qual destas opções é geralmente considerada mais segura para investir?",
        opcao_a: "Ações de empresas",
        opcao_b: "Poupança",
        opcao_c: "Criptomoedas",
        opcao_d: "Empréstimo a amigos",
        resposta_correta: "B",
        explicacao: "Entre as opções, a poupança é geralmente considerada mais segura, embora ofereça rendimentos menores em comparação com investimentos de maior risco."
      }
    ];

    // Inserir todas as perguntas
    const { error: perguntasError } = await supabase
      .from('perguntas_quiz')
      .insert([...perguntasBasico, ...perguntasOrcamento, ...perguntasInvestimentos]);

    if (perguntasError) throw perguntasError;

    console.log("Quizzes e perguntas inseridos com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro ao inserir quizzes:", error);
    return { success: false, error };
  }
}
