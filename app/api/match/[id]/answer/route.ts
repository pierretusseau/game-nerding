import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'
// import { formatSupabaseDateTime } from '@/Utils/Utils'

// Create a new match
/*----------------------------------------------------*/
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  
  const supabase = await createGamemasterClient()
  console.log(`Requesting answer to game ${params.id} for current round`)

  const { data, error } = await supabase
    .from('matches')
    .select('rounds')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({
    code: 500,
    body: { message: `Error while getting the answer of the round` }
  })

  if (!data || !data.rounds || !data.rounds.length) return NextResponse.json({
    code: 500,
    body: { message: `Wrong round asked` }
  })

  const { data: roundData, error: roundError } = await supabase
    .from('rounds')
    .select('full_game, end_time')
    .eq('match_id', params.id)
    .eq('id', data.rounds[data.rounds.length - 1] as number)
    .single()

  if (roundError) return NextResponse.json({
    code: 500,
    body: { message: `Error while getting answer for match round` }
  })

  const now = new Date().getTime()
  const matchEndingTime = new Date(roundData.end_time).getTime()

  if (Math.floor(matchEndingTime) - now > 0) {
    return NextResponse.json({
      code: 500,
      error: 'Did you try to cheat ?',
      body: { message: `Did you try to cheat ?` }
    })
  }

  console.log('Answer should be :', roundData.full_game)

  return NextResponse.json({
    code: 200,
    data: {
      game: roundData.full_game as Game
    },
    body: { message: `Match creation process ended` }
  })
}