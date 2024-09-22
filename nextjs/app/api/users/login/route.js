import { findUserByEmail } from "../services";
import { NextResponse } from "next/server";
import { RateLimiter } from "limiter";
import * as jose from 'jose';


const limiter = new RateLimiter({ tokensPerInterval: 50, interval: "min", fireImmediately: true });

export async function POST(request, response, next) {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: 'Too Many Requests' },
      { status: 429 }
    )
  }

  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: { message: '请输入邮箱和密码。' } }, { status: 403 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: { message: '邮箱密码错误。' } }, { status: 403 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: { message: '邮箱密码错误。' } }, { status: 403 });
  }
  const jwtToken = await new jose.SignJWT({ email: user.email, id: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

  return NextResponse.json({ success: true, message: '登陆成功。', data: { token: jwtToken, user } });

}
