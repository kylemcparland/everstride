export default function handler(req, res) {
  res.setHeader("Set-Cookie", [
    "session=; Path=/; Max-Age=0; HttpOnly",
    "stripe_mid=; Path=/; Max-Age=0; HttpOnly",
    "stripe_sid=; Path=/; Max-Age=0; HttpOnly"
  ]);

  res.status(200).json({ message: "Logged out" });
}
