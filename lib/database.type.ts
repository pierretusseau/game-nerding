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
          category: number | null
          checksum: string
          created_at: string
          developer: number | null
          edited_at: string | null
          genres: Json[]
          id: number
          name: string
          platforms: Json[]
          publisher: number | null
          rating: number | null
          rating_count: number | null
          release_year: number
          unsure_developer: boolean
          unsure_publisher: boolean
        }
        Insert: {
          category?: number | null
          checksum: string
          created_at?: string
          developer?: number | null
          edited_at?: string | null
          genres?: Json[]
          id: number
          name: string
          platforms?: Json[]
          publisher?: number | null
          rating?: number | null
          rating_count?: number | null
          release_year: number
          unsure_developer?: boolean
          unsure_publisher?: boolean
        }
        Update: {
          category?: number | null
          checksum?: string
          created_at?: string
          developer?: number | null
          edited_at?: string | null
          genres?: Json[]
          id?: number
          name?: string
          platforms?: Json[]
          publisher?: number | null
          rating?: number | null
          rating_count?: number | null
          release_year?: number
          unsure_developer?: boolean
          unsure_publisher?: boolean
        }
        Relationships: []
      }
      companies: {
        Row: {
          checksum: string
          country: number | null
          created_at: string
          description: string
          developed: Json[] | null
          edited_at: string | null
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
          edited_at?: string | null
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
          edited_at?: string | null
          id?: number
          name?: string
          published?: Json[] | null
          websites?: Json[]
        }
        Relationships: []
      }
      games: {
        Row: {
          category: number
          checksum: string
          created_at: string
          first_release_date: number
          genres: Json[] | null
          id: number
          name: string
          platforms: Json[]
          rating: number
          rating_count: number
        }
        Insert: {
          category: number
          checksum: string
          created_at?: string
          first_release_date?: number
          genres?: Json[] | null
          id?: number
          name?: string
          platforms?: Json[]
          rating: number
          rating_count: number
        }
        Update: {
          category?: number
          checksum?: string
          created_at?: string
          first_release_date?: number
          genres?: Json[] | null
          id?: number
          name?: string
          platforms?: Json[]
          rating?: number
          rating_count?: number
        }
        Relationships: []
      }
      genres: {
        Row: {
          checksum: string
          created_at: string
          edited_at: string | null
          id: number
          name: string
        }
        Insert: {
          checksum: string
          created_at?: string
          edited_at?: string | null
          id?: number
          name?: string
        }
        Update: {
          checksum?: string
          created_at?: string
          edited_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      platforms: {
        Row: {
          checksum: string | null
          created_at: string
          edited_at: string | null
          id: number
          name: string | null
          platform_logo: number | null
        }
        Insert: {
          checksum?: string | null
          created_at?: string
          edited_at?: string | null
          id?: number
          name?: string | null
          platform_logo?: number | null
        }
        Update: {
          checksum?: string | null
          created_at?: string
          edited_at?: string | null
          id?: number
          name?: string | null
          platform_logo?: number | null
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
