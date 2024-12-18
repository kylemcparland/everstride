export default function login(req, res) {
  const { username } = req.body;

  const sessionToken = `${username}`;

  res.setHeader("Set-Cookie", `session=${sessionToken}; Path=/; HttpOnly`);

  res.status(200).json({ message: "Login successful!" });
}
