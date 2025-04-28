export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      metas: {
        Row: {
          ativo: boolean
          created_at: string
          data_alvo: string
          data_inicio: string
          descricao: string | null
          id: string
          titulo: string
          user_id: string
          valor_alvo: number
          valor_atual: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          data_alvo: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          titulo: string
          user_id: string
          valor_alvo: number
          valor_atual?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          data_alvo?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          titulo?: string
          user_id?: string
          valor_alvo?: number
          valor_atual?: number
        }
        Relationships: []
      }
      perguntas_quiz: {
        Row: {
          explicacao: string | null
          id: string
          opcao_a: string
          opcao_b: string
          opcao_c: string
          opcao_d: string
          pergunta: string
          quiz_id: string
          resposta_correta: string
        }
        Insert: {
          explicacao?: string | null
          id?: string
          opcao_a: string
          opcao_b: string
          opcao_c: string
          opcao_d: string
          pergunta: string
          quiz_id: string
          resposta_correta: string
        }
        Update: {
          explicacao?: string | null
          id?: string
          opcao_a?: string
          opcao_b?: string
          opcao_c?: string
          opcao_d?: string
          pergunta?: string
          quiz_id?: string
          resposta_correta?: string
        }
        Relationships: [
          {
            foreignKeyName: "perguntas_quiz_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nome: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          nome?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nome?: string | null
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          nivel: string | null
          titulo: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          nivel?: string | null
          titulo: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          nivel?: string | null
          titulo?: string
        }
        Relationships: []
      }
      respostas_quiz: {
        Row: {
          correta: boolean
          created_at: string
          id: string
          pergunta_id: string
          quiz_id: string
          resposta_escolhida: string
          user_id: string
        }
        Insert: {
          correta: boolean
          created_at?: string
          id?: string
          pergunta_id: string
          quiz_id: string
          resposta_escolhida: string
          user_id: string
        }
        Update: {
          correta?: boolean
          created_at?: string
          id?: string
          pergunta_id?: string
          quiz_id?: string
          resposta_escolhida?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "respostas_quiz_pergunta_id_fkey"
            columns: ["pergunta_id"]
            isOneToOne: false
            referencedRelation: "perguntas_quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "respostas_quiz_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes: {
        Row: {
          categoria: string
          created_at: string
          data_transacao: string
          descricao: string
          id: string
          tipo: string
          user_id: string
          valor: number
        }
        Insert: {
          categoria: string
          created_at?: string
          data_transacao?: string
          descricao: string
          id?: string
          tipo: string
          user_id: string
          valor: number
        }
        Update: {
          categoria?: string
          created_at?: string
          data_transacao?: string
          descricao?: string
          id?: string
          tipo?: string
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
