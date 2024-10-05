// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from 'nodemailer';
const userE = '253903830@qq.com';

const transporter = nodemailer.createTransport({
  service: 'qq', // 选择你的邮件服务提供商，例如腾讯企业邮箱、网易邮箱等
  host: 'smtp.qq.com', // 邮箱的 SMTP 服务器
  prot: 456,
  secure: true, // 一定要使用SSL，如果是使用TLS，secure的值为false
  auth: {
    user: userE, // 发件人邮箱
    pass: 'cbrhizyojnedbibg' // 发件人邮箱密码或授权码
  }
});

export async function sendMail({ from, to, subject, html }) {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (e) {
    throw new Error(`Could not send email: ${e.message}`);
  }
}

export const CONFIG = {
  from: userE,
};
