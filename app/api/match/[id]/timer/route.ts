import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'
import { formatSupabaseDateTime } from '@/Utils/Utils'

// Create a new match
/*----------------------------------------------------*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createGamemasterClient()

  const now = new Date()
  const matchEndingTime = new Date(now)
    .setSeconds(now.getSeconds() + 10)

  const { data, error } = await supabase
    .from('matches')
    .update({
      round_end: formatSupabaseDateTime(matchEndingTime)
    })
    .eq('id', params.id)
    .select()
    .single()

  return NextResponse.json({
    code: 200,
    data: {
      matchEndingTime,
    },
    body: { message: `Match creation process ended` }
  })
}