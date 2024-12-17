import { accessToken, newAccessToken, userName } from "./stravaUserInfo.js";

export function getUserName() {
  return userName;
}

// Function to calculate total distance for activities this week
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

// Function to calculate total distance for activities today
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

export async function loadUserData() {
  console.log("Starting loadUserData");

  await newAccessToken();
  console.log("Access token fetched:", accessToken);

  const dataLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`;
  console.log("Data link:", dataLink);

  fetch(dataLink)
    .then((res) => res.json())
    .then((activities) => {
      console.log("Activities fetched:", activities);

      const totalDistanceThisWeek = Math.round(
        getTotalDistanceThisWeek(activities)
      );
      const totalDistanceToday = Math.round(getTotalDistanceToday(activities));

      console.log("Total distance this week:", totalDistanceThisWeek);
      console.log("Total distance today:", totalDistanceToday);

      // Ensure only one call to updateDistance
      console.log("Calling updateDistance for the first time");
      fetch("/api/updateDistance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, distance: totalDistanceToday }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Update distance response:", data.message);
        })
        .catch((error) => console.error("Error updating distance:", error));

      document.getElementById(
        "distance-this-week"
      ).textContent = `Total distance this week: ${totalDistanceThisWeek} meters`;
      document.getElementById(
        "distance-today"
      ).textContent = `Total distance today: ${totalDistanceToday} meters`;

      console.log("Displayed total distance this week and today");
    })
    .catch((error) => console.error("Error fetching data:", error));
}
