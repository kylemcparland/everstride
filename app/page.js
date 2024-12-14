import styles from "./page.module.css";
import { fetchAllUsers } from "./helpers/fetchAllUsers";
import { fetchUserByName } from "./helpers/fetchUserByName";
import { fetchItemsByType } from "./helpers/fetchItemsByType";

// Reusable list component
const ItemList = ({ title, items }) => (
  <ul>
    <h3>{title}</h3>
    {items.map((item) => (
      <li key={item.id}>
        {item.name} -- {item.description}
      </li>
    ))}
  </ul>
);

export default async function Home() {
  const [allUsers, oneUser, hats, shirts, pants, boots, weapons] = await Promise.all([
    fetchAllUsers(),
    fetchUserByName("Kyle McParland"),
    fetchItemsByType("hat"),
    fetchItemsByType("shirt"),
    fetchItemsByType("pants"),
    fetchItemsByType("boots"),
    fetchItemsByType("weapon"),
  ]);

  const itemCategories = [
    { title: "All hats in database:", items: hats },
    { title: "All shirts in database:", items: shirts },
    { title: "All pants in database:", items: pants },
    { title: "All boots in database:", items: boots },
    { title: "All weapons in database:", items: weapons },
  ];

  return (
    <main className={styles.main}>
      <ul>
        <h3>Example of all users' data from the DB:</h3>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} -- Distance travelled: {user.distance_travelled}
          </li>
        ))}
      </ul>

      <h3>
        Example of a single user's data from the DB: {oneUser.name}: {oneUser.distance_travelled}
      </h3>

      {itemCategories.map(({ title, items }) => (
        <ItemList key={title} title={title} items={items} />
      ))}
    </main>
  );
}
