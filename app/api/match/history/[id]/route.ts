import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'

// Create a new match
/*----------------------------------------------------*/
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  console.log('Requesting match history')
  const supabase = await createGamemasterClient()
  const user = params.id

    // Create new match
    const { data, error } = await supabase
      .from('matches')
      .select()
      .eq('player_host->>name', user)

  console.log('user', user, 'has matches:', data)

  if (error) {
    return NextResponse.json({
      code: 500,
      error,
      body: { message: `Error while creating a new match` }
    })
  }

  return NextResponse.json({
    code: 200,
    data,
    body: { message: `Match creation process ended` }
  })
}