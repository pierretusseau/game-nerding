import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'
import { formatSupabaseDateTime, getRandomEntries } from '@/Utils/Utils'

// Create a new match
/*----------------------------------------------------*/
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  console.log('Requesting next round')
  const supabase = await createGamemasterClient()
  const id = params.id
  let matchEndingTime

  // Update Reserve option
  const { data, error } = await supabase
    .from('matches')
    .select('player_host, rounds')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({
    code: 500,
    error,
    body: { message: `Error while requesting current match` }
  })

  let newRound
  if (data && data.rounds) {
    const { data: randomGame, error: randomGameError } = await supabase.rpc('choose_random_game')
    
    if (!randomGame || randomGameError) return NextResponse.json({
      code: 500,
      error,
      body: { message: `Error while requesting a new random game` }
    })

    const now = new Date()
    matchEndingTime = new Date(now)
      .setSeconds(now.getSeconds() + 30)

    const { data: newRoundData, error: newRoundError } = await supabase
      .from('matches')
      .update({
        rounds: [
          ...data.rounds,
          randomGame[0]
        ],
        round_end: formatSupabaseDateTime(matchEndingTime)
      })
      .eq('id', id)
      .select('rounds, round_end')
      .single()
    
      if (!newRoundData || newRoundError) return NextResponse.json({
        code: 500,
        error,
        body: { message: `Error while creating a new round` }
      })
      newRound = newRoundData
  }

  if (newRound && newRound.rounds) {
    const rounds = newRound.rounds as Game[]
    const currentRound = newRound.rounds.length - 1
    const currentGame = rounds[currentRound]

    let genres = []
    if (currentGame.genres.length > 3) {
      genres.push(...getRandomEntries(currentGame.genres))
    } else {
      genres.push(...currentGame.genres)
    }

    const publishers = currentGame.publishers as GamePublishers

    const formatedGameToGuess = {
      genre1: genres[0],
      genre2: genres[1] || null,
      genre3: genres[2] || null,
      developer: currentGame?.developer,
      publisher: publishers,
      release_year: currentGame?.release_year
    }

    console.log(newRound.round_end)
    
    return NextResponse.json({
      code: 200,
      data: {
        gameToGuess: formatedGameToGuess,
        roundEndingTime: matchEndingTime
      },
      body: { message: `Match creation process ended` }
    })
  }
}