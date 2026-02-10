import Stripe from "stripe";

// Stripe client used to create checkout sessions.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    // Use the request origin to build redirect URLs.
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Single-tier $49 payment session.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI Copy Concierge Unlimited",
              description: "Unlimited AI copy generation.",
            },
            unit_amount: 4900,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/dashboard?canceled=true`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json(
      { error: "Unable to start Stripe checkout." },
      { status: 500 }
    );
  }
}
