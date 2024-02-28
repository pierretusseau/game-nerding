import { createClient } from "@supabase/supabase-js"

const options = {
  // db: {
  //   schema: 'public',
  // },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    options
  )
}