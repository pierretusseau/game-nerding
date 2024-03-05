import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [] as string[]

if (process.env.NEXT_PUBLIC_ENV === 'development') allowedOrigins.push('http://localhost:3000')
if (process.env.NEXT_PUBLIC_URL) allowedOrigins.push(process.env.NEXT_PUBLIC_URL)
if (process.env.VERCEL_URL) allowedOrigins.push(process.env.VERCEL_URL)
if (process.env.VERCEL_BRANCH_URL) allowedOrigins.push(process.env.VERCEL_BRANCH_URL)

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
 
export function middleware(request: NextRequest) {
  console.log('origin', request.headers.get('origin'))
  console.log('allowed origin', allowedOrigins)
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  if (!isAllowedOrigin && origin.length > 0) return NextResponse.json({
    error: 'Unauthorized request'
  }, {
    status: 403
  })
 
  // // Handle preflighted requests
  // const isPreflight = request.method === 'OPTIONS'
 
  // if (isPreflight) {
  //   const preflightHeaders = {
  //     ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
  //     ...corsOptions,
  //   }
  //   return NextResponse.json({}, { headers: preflightHeaders })
  // }
 
  // Handle simple requests
  const response = NextResponse.next()
 
  // if (isAllowedOrigin) {
  //   response.headers.set('Access-Control-Allow-Origin', origin)
  // }
 
  // Object.entries(corsOptions).forEach(([key, value]) => {
  //   response.headers.set(key, value)
  // })
 
  return response
}
 
export const config = {
  matcher: '/api/(.*)',
}