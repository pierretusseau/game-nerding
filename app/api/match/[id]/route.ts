import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'

export const dynamic = 'force-dynamic'

// Create a new match
/*----------------------------------------------------*/
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  if (process.env.NEXT_PUBLIC_DEBUG) console.log('Requesting match information')

  const supabase = await createGamemasterClient()
  const id = params.id

  // Get match data
  const { data, error } = await supabase
    .from('matches')
    .select('rounds')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({
      code: 500,
      error,
      body: { message: `Error while requesting current match` }
    })
  }

  if (data.rounds.length === 0) {
    return NextResponse.json({
      code: 200,
      body: { message: `Match creation process ended with no round` }
    })
  }

  const { data: currentRound, error: errorCurrentRound } = await supabase
    .from('rounds')
    .select('hints_game, end_time')
    .eq('match_id', params.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (errorCurrentRound) {
    return NextResponse.json({
      code: 500,
      error,
      body: { message: `Error while requesting current match rounds` }
    })
  }

  // if (process.env.NEXT_PUBLIC_DEBUG) console.log('The match is :', data)

  if (data && currentRound) {
    return NextResponse.json({
      code: 200,
      data: currentRound,
      body: { message: `Match creation process ended with rounds` }
    })
  }
}