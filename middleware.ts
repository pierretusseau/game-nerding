import { NextRequest, NextResponse } from 'next/server'
 
const allowed_url = process.env.NEXT_PUBLIC_ENV === 'development'
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_URL
const allowedOrigins = [allowed_url]
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
 
export function middleware(request: NextRequest) {
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