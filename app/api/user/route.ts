import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import createServerClient from '@/lib/supabase-server'

// Get all users
/*----------------------------------------------------*/
export async function GET() {
  const supabase = await createServerClient()

  const { data: dbUser } = await <User>supabase.auth.getUser()

  // Get reserve data
  const { data: singleUser, error: singleError } = await supabase
    .from('users')
    .select()
    .eq('uuid', dbUser.user.id)
    .single()
  
  console.log('singleError', singleError)
  
  if (singleError) return NextResponse.json({
    code: 500,
    error: singleError,
    body: { message: `Error getting single user data`, }
  })

  console.log('Single user', singleUser)

  if (singleUser.role !== 'admin') return NextResponse.json({
    code: 401,
    body: { message: `Not authorized`, }
  })

  const { data, error } = await supabase
    .from('Users')
    .select()
  
  console.log('Getting users error', error)

  if (error) NextResponse.json({
    code: 500,
    error,
    body: { message: `Error getting all users data`, }
  })

  // Valid response
  return NextResponse.json({
    code: 200,
    data,
    body: { message: `Got all users` }
  })
}

// Creating a new user
/*----------------------------------------------------*/
// export async function POST(req: NextRequest) {
//   console.log('Requesting new user creation')
//   const supabase = await createServerClient()

//   // const { data: dbUser } = await <User>supabase.auth.getUser()

//   // console.log(dbUser.user)
//   // if (dbUser.user) return NextResponse.json({ body: {
//   //   code: 401,
//   //   body: { message: 'A user is already connected' }
//   // }})

//   const { data, error } = await supabase
//     .from('users')
//     .insert({})
//     .select()
//     .single()
  
//   console.log('User creation data:', data)
//   console.log('User creation error:', error)
// }

// Update an existing user
/*----------------------------------------------------*/
export async function PATCH(req: NextRequest) {
  const supabase = await createServerClient()
  const { userId, role } = await req.json()

  const { data: dbUser } = await <User>supabase.auth.getUser()

  // Check user authentication
  if (!dbUser) return NextResponse.json({ body: {
    code: 401,
    body: { message: "Not authenticated" }
  }})
  const user = dbUser.user

  // Update Reserve option
  const { data, error } = await supabase
    .from('Users')
    .update({
      role: role
    })
    .eq('id', userId)
    .select()
  
  if (error) return NextResponse.json({ body: {
    code: 500,
    body: { message: `Error updating user ${userId} with role ${role}` }
  }})

  // Cleanup and valid response
  return NextResponse.json({body: {
    code: 200,
    body: { message: `User ${userId} role is now ${role}` }
  }})
}