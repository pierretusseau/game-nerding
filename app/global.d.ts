import type { Database as DB } from "@/lib/database.type"
import { User } from '@supabase/supabase-js/dist/main/lib/types'

declare global {
  type Database = DB
  type Game = DB['public']['Tables']['app_games']['Row']
  type Company = DB['public']['Tables']['companies']['Row']
  type Genre = DB['public']['Tables']['genres']['Row']
  type Platform = DB['public']['Tables']['platforms']['Row']
  // type GameGenres = DB['public']['Tables']['app_games']['Row']['genres']
  type Match = DB['public']['Tables']['matches']['Row']
  type GameGenre = Json
  type GameDeveloper = Json
  type GamePublisher = Json
  type GamePlatform = Json
  type UserData = DB['public']['Tables']['users']['Row']
  type User = User
  type GameHints = {
    genre1: number,
    genre2: number|null,
    genre3: number|null,
    developer: number,
    publisher: number,
    release_year: number,
  }
}