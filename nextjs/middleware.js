import * as jose from 'jose';

import { NextRequest, NextResponse } from 'next/server';
export async function middleware(req, res, next) {
  const token = req.headers.get('authorization');
  if (!token)
    return NextResponse.json({ success: false, message: "User Not Authorized" }, {
      status: 401
    })


  try {
    const { payload: jwtData } = await jose.jwtVerify(
      token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    // const requestHeaders = new Headers(req.headers)
    req.headers.set('user-email', jwtData.email)
    req.headers.set('user-id', jwtData.id)
    const resp = NextResponse.next({
      request: req,
    })
    return resp;
  }
  catch (err) {
    return NextResponse.json({ success: false, message: "User Not Autorized" }, { status: 401 })
  }
}
export const config = {
  matcher: '/api/auth/:path*',
}
