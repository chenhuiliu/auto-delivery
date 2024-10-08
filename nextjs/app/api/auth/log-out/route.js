import { NextResponse } from 'next/server';
import { findUserByEmailAndId, updateUser } from '../../users/services'
import { RateLimiter } from "limiter";
/**
 * 登出
 */
// 1 分钟 10次 限制
const limiter = new RateLimiter({ tokensPerInterval: 10, interval: "min", fireImmediately: true });
export async function POST(request, response) {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: '请求次数过多，请稍后再试！' },
      { status: 429 }
    )
  }
  const userEmail = request.headers.get('user-email');
  const userId = request.headers.get('user-id');
  const token = request.headers.get('authorization');
  if (userEmail && userId) {
    const user = await findUserByEmailAndId(userEmail, userId)
    if (!user || (user && (user.token !== token || (Date.now() > user.tokenExpireAt)))) {
      return NextResponse.json({ success: false, message: "User Not Authorized" }, {
        status: 401
      });
    }
    // 清空 token
    await updateUser(userId, { token: null });
    // 清空 cookie
    response.headers.delete('Set-Cookie');

    return NextResponse.json({ data: null, message: "ok" });
  } else {
    return NextResponse.json({ error: { message: '401' } }, {
      status: 401
    })
  }
}
