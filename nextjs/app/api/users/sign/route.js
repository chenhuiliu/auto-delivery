import { createUser, findUserByEmail } from './../services'
import { NextResponse } from 'next/server';
import { RateLimiter } from "limiter";
// 每分钟 5 次
const limiter = new RateLimiter({ tokensPerInterval: 5, interval: "min", fireImmediately: false });

export async function POST(request, response) {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: '请求次数过多。' },
      { status: 429 }
    )
  }
  const body = await request.json();
  const { email, password, username } = body;
  const user = await findUserByEmail(email);
  if (user) {
    return NextResponse.json({ error: { message: '用户已存在，不能重复注册。' } }, {
      status: 403
    });
    ;
  }
  try {
    const andUser = await createUser(email, password, username);
    return NextResponse.json(
      {
        success: true, message: '创建成功。'
      },
      { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 403 });
  }
}
