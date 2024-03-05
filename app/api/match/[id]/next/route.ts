import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'
import { formatSupabaseDateTime, getRandomEntries } from '@/Utils/Utils'

export const dynamic = 'force-dynamic'

let matchRequested = [] as string[]

// Create a new match
/*----------------------------------------------------*/
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  console.log('Requesting next round')
  const supabase = await createGamemasterClient()
  const id = params.id

  // Get match informations
  const { data: match, error: errorMatch } = await supabase
    .from('matches')
    .select('rounds, rules')
    .eq('id', id)
    .single()

  if (errorMatch) return NextResponse.json({
    code: 500,
    error: errorMatch,
    body: { message: `Error while requesting current match` }
  })

  if (!match|| !match.rounds || !match.rules) return NextResponse.json({
    code: 500,
    match: match,
    body: { message: `Error in match data` }
  })

  // Don't ask twice for the same match
  if (matchRequested.some(match => match === params.id)) {
    return NextResponse.json({
      code: 500,
      body: { message: `Match already requested` }
    })
  } else {
    matchRequested.push(id)
  }

  // Construct a new match data
  const thisMatch = {
    ...match,
    rules: match.rules as MatchRules
  }

  // Get rounds details for this match
  const { data: pastRounds, error: errorPastRounds } = await supabase
    .from('rounds')
    .select('full_game')
    .eq('match_id', params.id)
  
  if (errorPastRounds) return NextResponse.json({
    code: 500,
    match: match,
    body: { message: `Error in match data` }
  })

  // Get game at random
  const {
    data: game,
    error: gameError
  } = await supabase.rpc( 'choose_random_game', {
    excludes: pastRounds.length > 0
      ? pastRounds.map((round: Round) => round.full_game.id)
      : [0] // Work around there's no ID 0 game
  })

  if (gameError) return NextResponse.json({
    code: 500,
    error: gameError,
    body: { message: `Error while requesting a new random game` }
  })
  
  const randomGame = game[0]
  console.log('random game is :', randomGame.name)

  // Start creating round
  let newRound
  let roundEndingTime
  let genres = []

  // Get end time for round
  const now = new Date()
  roundEndingTime = new Date(now)
    .setSeconds(now.getSeconds() + thisMatch.rules.timer)
  
    
  // Create formated hints
  if (randomGame.genres.length > 3) {
    genres.push(...getRandomEntries(randomGame.genres))
  } else {
    genres.push(...randomGame.genres)
  }

  const hints = {
    genre1: genres[0] as number,
    genre2: genres[1] || null as number|null,
    genre3: genres[2] || null as number|null,
    developer: randomGame.developer,
    publisher: randomGame.publishers,
    release_year: randomGame.release_year
  }
  
  newRound = {
    match_id: params.id,
    full_game: randomGame,
    end_time: formatSupabaseDateTime(roundEndingTime),
    hints_game: hints as GameHints,
    round_number: pastRounds.length
  } as Round

  const { data: newRoundData, error: newRoundError } = await supabase
    .from('rounds')
    .insert(newRound)
    .select()
    .single()

  if (newRoundError) return NextResponse.json({
    code: 500,
    error: newRoundError,
    body: { message: `Error while creating the new round` }
  })

  if (newRoundData) {
    const { data: updatedMatch, error: errorUpdatedMatch } = await supabase
      .from('matches')
      .update({
        rounds: [
          ...match.rounds,
          newRoundData.id
        ]
      })
      .eq('id', params.id)
  
    if (errorUpdatedMatch) return NextResponse.json({
      code: 500,
      error: errorUpdatedMatch,
      body: { message: `Error while updating the current match with new round` }
    })
  
    matchRequested = matchRequested.filter(match => match !== params.id)
    return NextResponse.json({
      code: 200,
      data: {
        hints_game: hints,
        end_time: formatSupabaseDateTime(roundEndingTime),
        round_number: pastRounds.length
      },
      body: { message: `Match creation process ended` }
    })
  }

  return NextResponse.json({
    code: 500,
    body: { message: `Match creation process ended with an error` }
  })
}