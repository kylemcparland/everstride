import { accessToken, newAccessToken, userName } from "./stravaUserInfo";

export function getUserName() {
  return userName;
}

export function getTotalDistanceThisWeek(activities) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  return activities
    .filter((activity) => {
      const activityDate = new Date(activity.start_date);
      return activityDate >= startOfWeek && activityDate <= today;
    })
    .reduce((total, activity) => total + activity.distance, 0);
}

export function getTotalDistanceToday(activities) {
  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  return activities
    .filter((activity) => {
      const activityDate = new Date(activity.start_date);
      return activityDate >= startOfToday && activityDate <= endOfToday;
    })
    .reduce((total, activity) => total + activity.distance, 0);
}

export function getTotalDistance(activities) {
  return activities.reduce((total, activity) => total + activity.distance, 0);
}

export async function loadUserData() {
  console.log(
    "\n🟢 STRAVA stravaAPI loadUserData " + JSON.stringify({ userName })
  );

  await newAccessToken(); // Wait for the new access token to be fetched
  // console.log("🟢 Got access token, generate link");
  // Hiding the access token now.
  // console.log(accessToken)

  const dataLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`;
  // Hiding the dataLink now.
  // console.log(dataLink)

  return fetch(dataLink)
    .then((res) => res.json())
    .then((activities) => {
      // console.log("🟢 Recieved the data from API, parsing");
      // Hiding the activities too, no need to list them all.
      // console.log(activities)

      const totalDistanceThisWeek = Math.round(
        getTotalDistanceThisWeek(activities)
      );
      const totalDistanceToday = Math.round(getTotalDistanceToday(activities));
      const totalDistance = Math.round(getTotalDistance(activities));

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      // App home page - Had to be set because this is running server side instead of client side now.

      // Update total_distance_today in the database
      return fetch(`${baseUrl}/api/updateDistance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, distance: totalDistanceToday }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("🟢 updateDistance:", data.message);

          // Update total_distance and gold in the database
          return fetch(`${baseUrl}/api/updateTotalDistance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, totalDistance }),
          });
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log("🔵updateTotalDistance:", data.message);
          return { totalDistanceThisWeek, totalDistanceToday, totalDistance };
        })
        .catch((error) => {
          console.error("⛔ Error updating total distance:", error);
          return { totalDistanceThisWeek, totalDistanceToday, totalDistance };
        });
    })
    .catch((error) => {
      console.error("⛔ Error fetching data:", error);
      return {
        totalDistanceThisWeek: 0,
        totalDistanceToday: 0,
        totalDistance: 0,
      };
    });
}
