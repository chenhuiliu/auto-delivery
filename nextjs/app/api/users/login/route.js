import { findUserByEmail, updateUser } from "../services";
import { NextResponse } from "next/server";
import { RateLimiter } from "limiter";
import * as jose from 'jose';

// 1 分钟 10次 限制
const limiter = new RateLimiter({ tokensPerInterval: 10, interval: "min", fireImmediately: true });

export async function POST(request,) {
  const remainingRequests = await limiter.removeTokens(1);

  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: '请求次数过多，请稍后再试！' },
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
  const jwtToken = await new jose.SignJWT({ email: user.email, id: user._id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

  // 数据库记录登录token和登录 time
  await updateUser(user._id, {
    token: jwtToken,
    tokenExpireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 天
  });

  const response = NextResponse.json({ success: true, message: '登陆成功。', data: { token: jwtToken, user } });
  response.cookies.set('token', jwtToken, {
    maxAge: 7 * 24 * 60 * 60, // Cookie的有效期，这里设置为7天（以秒为单位）
    path: '/', // Cookie的路径，设置为根路径，表示在整个网站都有效
  });
  return response;

}
