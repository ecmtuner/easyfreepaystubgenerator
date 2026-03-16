import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const origin = req.headers.get('origin') || 'https://easyfreepaystubgenerator.com';
  const body = await req.json().catch(() => ({}));
  const stubToken = body?.stubToken;

  // Mock mode
  if (!stripeKey || stripeKey === 'sk_test_placeholder') {
    return NextResponse.json({ url: `/download?token=${stubToken}&mock=1` });
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pay Stub PDF — EasyFreePayStubGenerator.com',
            description: 'One professional pay stub — print-ready PDF',
          },
          unit_amount: 500,
        },
        quantity: 1,
      }],
      success_url: `${origin}/download?token=${stubToken}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Stripe error:', e);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
