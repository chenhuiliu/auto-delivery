import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');
  const pass = searchParams.get('pass');

  // eslint-disable-next-line no-promise-executor-return

  return NextResponse.json({
    user,
    pass,
  });
}
