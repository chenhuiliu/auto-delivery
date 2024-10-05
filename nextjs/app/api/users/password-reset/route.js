import { NextResponse } from "next/server";
import { CONFIG as MAIL_CONFIG, sendMail } from '@/lib/mail';
import { RateLimiter } from "limiter";
import { updateUser, findUserByEmail } from "../services";
/**
 * 邮箱找回密码
 */

const limiter = new RateLimiter({ tokensPerInterval: 50, interval: "min", fireImmediately: true });

function generateCustomToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
export async function POST(req, res) {
  // 截流 
  const remainingRequests = await limiter.removeTokens(1);

  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: 'Too Many Requests' },
      { status: 429 }
    )
  }
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json({ error: { message: '不能为空' } }, { status: 404 });
  }
  // 还要验证用户是否注册
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: { message: '该邮箱未注册。' } }, { status: 404 });
  }

  const code = generateCustomToken();

  await updateUser(
    user._id,
    {
      code1: code,
      code1ExpireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }
  )

  await sendMail({
    to: email,
    from: MAIL_CONFIG.from,
    subject: `邮箱验证邮件 ${process.env.VERCEL_URL}`,
    html: `
      <div>
        <p>你好， ${email} </p>
        <p>请点击 <a href="${process.env.VERCEL_URL}/verify-email/${code}">这个链接</a> 以确认你的邮箱。</p>
      </div>
      `,
  });

  return NextResponse.json({ data: "发送成功！" });
}


