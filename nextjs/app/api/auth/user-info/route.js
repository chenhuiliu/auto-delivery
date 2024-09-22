import { NextResponse } from 'next/server';
import { findUserByEmailAndId } from '../../users/services'
export async function GET(request, response) {
  const userEmail = request.headers.get('user-email');
  const userId = request.headers.get('user-id');


  if (userEmail && userId) {
    const user = await findUserByEmailAndId(userEmail, userId)
    return NextResponse.json({ user });
  } else {
    return NextResponse.json({ error: { message: '401' } }, {
      status: 401
    })
  }
}
