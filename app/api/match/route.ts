import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'

export const dynamic = 'force-dynamic'

// Create a new match
/*----------------------------------------------------*/
export async function POST(req: NextRequest) {
  console.log('Requesting match creation')
  const supabase = await createGamemasterClient()
  const { user, rules } = await req.json()

  // Check if user is provided
  if (!user) NextResponse.json({
    code: 500,
    body: { message: `A user is required to create a match` }
  })

  // Create new match
  const { data, error } = await supabase
    .from('matches')
    .insert({
      player_host: user,
      rules: rules,
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

  return NextResponse.json({
    code: 200,
    data: {
      matchID: data.id
    },
    body: { message: `Match creation process ended` }
  })
}