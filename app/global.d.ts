import type { Database as DB } from "@/lib/database.type"
// import { User } from '@supabase/supabase-js/dist/main/lib/types'

declare global {
  type Database = DB
  type Game = DB['public']['Tables']['app_games']['Row']
  type Company = DB['public']['Tables']['companies']['Row']
  type Genre = DB['public']['Tables']['genres']['Row']
  // type UserData = DB['public']['Tables']['Users']['Row']
  // type User = User
  
}