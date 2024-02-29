import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'
import { getRandomEntries } from '@/Utils/Utils'

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

  // if (process.env.NEXT_PUBLIC_DEBUG) console.log('The match is :', data)

  if (data && data.rounds) {
    const rounds = data.rounds as Game[]
    const currentRound = data.rounds.length - 1
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
    
    return NextResponse.json({
      code: 200,
      data: formatedGameToGuess,
      body: { message: `Match creation process ended` }
    })
  }
}