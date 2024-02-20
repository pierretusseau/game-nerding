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
      app_games: {
        Row: {
          checksum: string
          created_at: string
          developer: string | null
          genres: Json[]
          id: number
          name: string
          publisher: string | null
          release_year: number
          unsure_developer: boolean
          unsure_publisher: boolean
        }
        Insert: {
          checksum: string
          created_at?: string
          developer?: string | null
          genres?: Json[]
          id: number
          name: string
          publisher?: string | null
          release_year: number
          unsure_developer?: boolean
          unsure_publisher?: boolean
        }
        Update: {
          checksum?: string
          created_at?: string
          developer?: string | null
          genres?: Json[]
          id?: number
          name?: string
          publisher?: string | null
          release_year?: number
          unsure_developer?: boolean
          unsure_publisher?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_app_games_developer_fkey"
            columns: ["developer"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["checksum"]
          },
          {
            foreignKeyName: "public_app_games_publisher_fkey"
            columns: ["publisher"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["checksum"]
          }
        ]
      }
      companies: {
        Row: {
          checksum: string
          country: number | null
          created_at: string
          description: string
          developed: Json[] | null
          id: number
          name: string
          published: Json[] | null
          websites: Json[]
        }
        Insert: {
          checksum: string
          country?: number | null
          created_at?: string
          description?: string
          developed?: Json[] | null
          id?: number
          name?: string
          published?: Json[] | null
          websites?: Json[]
        }
        Update: {
          checksum?: string
          country?: number | null
          created_at?: string
          description?: string
          developed?: Json[] | null
          id?: number
          name?: string
          published?: Json[] | null
          websites?: Json[]
        }
        Relationships: []
      }
      games: {
        Row: {
          checksum: string
          created_at: string
          first_release_date: number
          genres: Json[] | null
          hypes: number
          id: number
          involved_companies: Json[]
          name: string
        }
        Insert: {
          checksum: string
          created_at?: string
          first_release_date?: number
          genres?: Json[] | null
          hypes?: number
          id?: number
          involved_companies?: Json[]
          name?: string
        }
        Update: {
          checksum?: string
          created_at?: string
          first_release_date?: number
          genres?: Json[] | null
          hypes?: number
          id?: number
          involved_companies?: Json[]
          name?: string
        }
        Relationships: []
      }
      genres: {
        Row: {
          checksum: string
          created_at: string
          id: number
          name: string
        }
        Insert: {
          checksum: string
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          checksum?: string
          created_at?: string
          id?: number
          name?: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
