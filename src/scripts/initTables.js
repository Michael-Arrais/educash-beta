
import { supabase } from "../integrations/supabase/client";

export async function initTables() {
  try {
    console.log("Verificando e criando tabelas necessárias...");
    
    // Verificar se a tabela metas existe
    const { data: tables } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', 'metas');
    
    if (!tables || tables.length === 0) {
      // Criar tabela de metas financeiras
      const { error: createTableError } = await supabase
        .rpc('execute_sql', {
          sql: `
          CREATE TABLE IF NOT EXISTS public.metas (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT,
            valor_atual NUMERIC DEFAULT 0,
            valor_alvo NUMERIC NOT NULL,
            data_inicio DATE DEFAULT CURRENT_DATE,
            data_alvo DATE NOT NULL,
            ativo BOOLEAN DEFAULT true,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
          
          -- Adicionar políticas de segurança
          ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;
          
          -- Políticas para usuários verem apenas suas próprias metas
          CREATE POLICY "Usuários veem suas próprias metas" ON public.metas
            FOR SELECT USING (auth.uid() = user_id);
          
          -- Políticas para usuários inserirem suas próprias metas
          CREATE POLICY "Usuários inserem suas próprias metas" ON public.metas
            FOR INSERT WITH CHECK (auth.uid() = user_id);
          
          -- Políticas para usuários atualizarem suas próprias metas
          CREATE POLICY "Usuários atualizam suas próprias metas" ON public.metas
            FOR UPDATE USING (auth.uid() = user_id);
          
          -- Políticas para usuários excluírem suas próprias metas
          CREATE POLICY "Usuários excluem suas próprias metas" ON public.metas
            FOR DELETE USING (auth.uid() = user_id);
          `
        });
      
      if (createTableError) {
        console.error("Erro ao criar tabela de metas:", createTableError);
      } else {
        console.log("Tabela de metas criada com sucesso!");
      }
    } else {
      console.log("Tabela de metas já existe.");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao inicializar tabelas:", error);
    return { success: false, error };
  }
}
