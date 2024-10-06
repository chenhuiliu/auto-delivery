import { NextResponse } from 'next/server';
import { findUserByEmailAndId } from '../../users/services'
/**
 * 获取用户信息
 */
export async function GET(request, response) {
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
    return NextResponse.json({ user });
  } else {
    return NextResponse.json({ error: { message: '401' } }, {
      status: 401
    })
  }
}
