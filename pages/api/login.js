import { runTestPageLogic } from "./newStravaLogic";

export default async function login(req, res) {
  const { username } = req.body;

  const sessionToken = `${username}`;
  res.setHeader("Set-Cookie", `session=${sessionToken}; Path=/; HttpOnly`);

  await runTestPageLogic(); // Run the logic from /test_page

  res.status(200).json({ message: "Login successful!" });
}
