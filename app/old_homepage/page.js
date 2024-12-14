import { fetchAllUsers, fetchUserByName } from "../helpers/userHelpers";
import HomeClient from "./page.client";

export default async function Page() {
  const allUsers = await fetchAllUsers();
  const oneUser = await fetchUserByName("Kyle McParland");

  return <HomeClient allUsers={allUsers} oneUser={oneUser} />;
}
