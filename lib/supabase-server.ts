import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
}