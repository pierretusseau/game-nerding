import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'

// Create a new match
/*----------------------------------------------------*/
export async function POST(req: NextRequest) {
  console.log('Requesting match creation')
  const supabase = await createGamemasterClient()
  const { user } = await req.json()

  // Check if user is provided
  if (!user) NextResponse.json({
    code: 500,
    body: { message: `A user is required to create a match` }
  })

  // Choose a random game
  // @ts-ignore
  const { data: randomGame, error: randomGameError } = await supabase.rpc('choose_random_game')

  if (randomGameError) return NextResponse.json({
    code: 500,
    randomGameError,
    body: { message: `Error while selecting a random game` }
  })

  // Create new match
  const { data, error } = await supabase
    .from('matches')
    .insert({
      player_host: user,
      rounds: [randomGame[0]]
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({
      code: 500,
      error,
      body: { message: `Error while creating a new match` }
    })
  }

  if (process.env.NEXT_PUBLIC_DEBUG) console.log('The game is :', data)

  return NextResponse.json({
    code: 200,
    data: {
      matchID: data.id
    },
    body: { message: `Match creation process ended` }
  })
}