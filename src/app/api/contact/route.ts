import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);

// Upstash Redis & Ratelimit 設定
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1m'), // 每分鐘最多 3 次
  analytics: true,
});

export async function POST(req: Request) {
  // 取得用戶 IP（支援多重代理）
  const forwarded = req.headers.get('x-forwarded-for');
  let ip: string | null = null;
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    const first = forwarded.split(',')[0];
    ip = first ? first.trim() : null;
  }
  if (!ip) {
    return NextResponse.json(
      { success: false, error: '無法取得用戶 IP，請稍後再試。' },
      { status: 400 }
    );
  }
  // 速率限制
  const rateResult = await ratelimit.limit(ip);
  if (!rateResult || !rateResult.success) {
    return NextResponse.json(
      { success: false, error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  const { name, email, message, turnstileToken, company } = await req.json();

  // 蜜罐欄位驗證
  if (company && company.trim() !== '') {
    return NextResponse.json(
      { success: false, error: 'Spam detected.' },
      { status: 400 }
    );
  }

  // Turnstile 驗證
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${turnstileSecret}&response=${turnstileToken}`,
    }
  );
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json(
      { success: false, error: '驗證碼失敗，請重試。' },
      { status: 400 }
    );
  }

  try {
    const data = await resend.emails.send({
      from: 'Alley Studio <onboarding@resend.dev>',
      to: ['jdpco.danny@gmail.com'],
      subject: '[網站聯絡表單] 新訊息',
      reply_to: email,
      html: `<p><b>姓名：</b>${name}</p><p><b>Email：</b>${email}</p><p><b>訊息：</b>${message}</p>`,
    });

    if (data.error) {
      return NextResponse.json(
        { success: false, error: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String((error as { message?: string }).message);
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
