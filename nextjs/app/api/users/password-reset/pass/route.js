import { findUserByEmail, updateUser } from "../../services";
import { NextResponse } from "next/server";
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({ tokensPerInterval: 5, interval: "min", fireImmediately: true });

export async function POST(request, response, next) {
  const remainingRequests = await limiter.removeTokens(1);

  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: '请求过多，请稍后再试！' },
      { status: 429 }
    )
  }
  const body = await request.json();
  const { email, password, token } = body;
  if (!email || !password) {
    return NextResponse.json({ error: { message: '' } }, { status: 403 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: { message: '' } }, { status: 403 });
  }


  if (user.code1 !== token) {
    return NextResponse.json({ error: { message: '邮箱码验证错误。' } }, { status: 403 });
  }
  if (Date.now() > user.code1ExpireAt) {
    return NextResponse.json({ error: { message: '邮箱码验证错误。' } }, { status: 403 });
  }
  await updateUser(
    user._id,
    {
      password: password,
    }
  )

  return NextResponse.json({ success: true, message: '修改成功！' });

}
