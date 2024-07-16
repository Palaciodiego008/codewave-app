import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/', '/users', '/projects']

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // // Check if the request path is a protected route
  // if (protectedRoutes.includes(url.pathname)) {
  //   // Check if the user is authenticated
  //   if (request.cookies.get('token') && request.cookies.get('token')?.value !== '') {
  //     console.log('User is authenticated', request.cookies.get('token'))
  //     // If the user is authenticated, continue to the next middleware
  //     return NextResponse.next()
  //   }

  //   // Redirect to the root of the site
  //   return NextResponse.redirect(new URL('/authentication/login', request.url))
  // }

  // // Redirect to the root of the site
  // return NextResponse.next()
}
