import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';

// 创建 rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 分钟
  limit: 3, // 每个 IP 15 分钟内最多 100 次请求
  message: '请求过于频繁，请稍后再试。',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: function (req, res, next) {
    res.json({
      message: "Too many requests, please try again later.",
    });
  },
  // keyGenerator: (req) => {
  //   const ipString = getIpAddress(req) as string;
  //   console.log('--==-', ipString);
  //   return ipString;
  // },
  keyGenerator: (req) => {
    console.log('--==--------99-', req)
    // 通过 x-forwarded-for 获取 IP 地址，如果没有，则回退到 req.connection.remoteAddress

    const xForwardedFor = req.headers['x-forwarded-for'];

    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0]; // 可能有多个IP，取第一个
    } else if (Array.isArray(xForwardedFor)) {
      return xForwardedFor[0];
    } else {
      return req.socket.remoteAddress || '127.0.0.1';
    }
  },
});

// Helper function to apply the Express middleware in Next.js
export default function applyRateLimit(req, res) {
  return ((resolve, reject) => {
    limiter(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve();
    });
  });
}

