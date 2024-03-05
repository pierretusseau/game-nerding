import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createGamemasterClient from '@/lib/supabase-gamemaster'

export const dynamic = 'force-dynamic'

// Create a new match
/*----------------------------------------------------*/
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  
  if (!process.env.NEXT_PUBLIC_DEBUG) return NextResponse.json({
    code: 500,
    body: { message: `Deleting a match is impossible outside of development env` }
  })

  const supabase = await createGamemasterClient()
  console.log(`Requesting delete of match ${params.id}`)

  const { error: roundsError } = await supabase
    .from('rounds')
    .delete()
    .eq('match_id', params.id)

  if (roundsError) return NextResponse.json({
    code: 500,
    body: { message: `Error while deleting rounds of match ${params.id}` }
  })

  const { error } = await supabase
    .from('matches')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({
    code: 500,
    body: { message: `Error while deleting match ${params.id}` }
  })

  console.log(`Match ${params.id} deleted with success`)
  return NextResponse.json({
    code: 200,
    body: { message: `Match deletion process ended` }
  })
}