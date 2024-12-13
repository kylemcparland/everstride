export const userName = "User_0 (Jon)";

require("dotenv").config();
const refreshToken = process.env.REFRESH_TOKEN;
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;


export let accessToken = "";

export async function newAccessToken() {
  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    const data = await response.json();
    accessToken = data.access_token;
  } catch (error) {
    console.error("Error fetching new access token:", error);
  }
}
