const stripe = require("stripe")(
  process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded",
        return_url:
          "https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}",
      });

      res.status(200).json({ clientSecret: session.client_secret });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
