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

  const now = new Date()
  const matchEndingTime = new Date(now)
    .setSeconds(now.getSeconds() + 35)

  const { data, error } = await supabase
    .from('matches')
    .select('rounds')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({
    code: 500,
    body: { message: `Error while getting the answer of the round` }
  })

  if (!data || !data.rounds.length) return NextResponse.json({
    code: 500,
    body: { message: `Wrong round asked` }
  })

  if (Math.floor(matchEndingTime / 1000) - now.getTime() / 1000 < 0) {
    return NextResponse.json({
      code: 500,
      body: { message: `Did you try to cheat ?` }
    })
  }

  const roundAnswer = data.rounds[data.rounds.length - 1]

  return NextResponse.json({
    code: 200,
    data: {
      game: roundAnswer
    },
    body: { message: `Match creation process ended` }
  })
}