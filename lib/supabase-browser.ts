import { createBrowserClient } from "@supabase/ssr"
import { PostgrestError } from "@supabase/supabase-js";

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabase;

export const updateOnNewer = async (table: string, column: string, getter: () => Promise<{ error: PostgrestError | null; }>) => {
  const localLastUpdate = localStorage.getItem('gn-last-update')
  if (!localLastUpdate) return
  const lastUpdateTime = new Date(JSON.parse(localLastUpdate)).getTime()

  const { data, error } = await supabase
    .from(table)
    .select(column)
    .not(column, 'is', null)
    .order(column, { ascending: false })
    .limit(1)
    // .single()
  
  if (error) return error

  if (data && data.length > 0) {
    const columnValue = Object.values(data[0])[0]
    if (columnValue) {
      const now = new Date()
      const lastReferenceDate = new Date (columnValue).getTime()
      if (lastReferenceDate > lastUpdateTime) {
        console.warn('Your', table, 'is out of date because of', column)
        console.warn('Requesting the new data...')
        getter()
        localStorage.setItem('gn-last-update', JSON.stringify(now))
      }
      return
    } else {
      throw new Error('No matching key/value in the required object')
    }
  }
}