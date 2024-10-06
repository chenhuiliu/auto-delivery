import { NextResponse } from "next/server";
import { CONFIG as MAIL_CONFIG, sendMail } from '@/lib/mail';
import { RateLimiter } from "limiter";
import { updateUser, findUserByEmail } from "../../services";
/**
 * 邮箱找回密码
 */
/**
 * 一分钟 10次
 */
const limiter = new RateLimiter({ tokensPerInterval: 3, interval: "min", fireImmediately: true });

function generateCustomToken() {
  const timestamp = Date.now();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${timestamp}${randomNum}`;
}
export async function POST(req, res) {
  // 截流 
  const remainingRequests = await limiter.removeTokens(1);

  if (remainingRequests < 0) {
    return NextResponse.json(
      { success: false, message: '请求次数过多。' },
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
      code1ExpireAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 小时有效
    }
  )

  await sendMail({
    to: email,
    from: MAIL_CONFIG.from,
    subject: `邮箱验证邮件 ${process.env.VERCEL_URL}`,
    html: `
      <div>
        <p>你好， ${email} </p>
        <p>欢迎您使用【找工作助手】服务，您的邮箱验证码为:${code}  有效期是 24 小时。</p>
        <p>如果该邮件误发给了您，您无需执行任何操作。</p>
        <p>此邮件由系统自动产生，请勿回复。</p>
      </div>
      `,
  });

  return NextResponse.json({ data: "发送成功！" });
}


