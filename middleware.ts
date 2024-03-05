import { NextRequest, NextResponse } from 'next/server'

// https://github.com/vercel/next.js/discussions/47933

const allowedOrigins = [] as string[]

if (process.env.NEXT_PUBLIC_ENV === 'development') allowedOrigins.push('http://localhost:3000')
if (process.env.NEXT_PUBLIC_URL) allowedOrigins.push(`https://${process.env.NEXT_PUBLIC_URL}`)
if (process.env.VERCEL_URL) allowedOrigins.push(`https://${process.env.VERCEL_URL}`)
if (process.env.VERCEL_BRANCH_URL) allowedOrigins.push(`https://${process.env.VERCEL_BRANCH_URL}`)
 
export function middleware(request: NextRequest) {
  // console.log('origin', request.headers.get('origin'))
  // console.log('allowed origin', allowedOrigins)

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  if (!isAllowedOrigin && origin.length > 0) return NextResponse.json({
    error: 'Unauthorized request'
  }, {
    status: 403
  })
 
  // Handle simple requests
  const response = NextResponse.next()
 
  return response
}
 
export const config = {
  matcher: '/api/(.*)',
}