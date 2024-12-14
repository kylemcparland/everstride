import "./page.css";
import NavBar from "@/components/NavBar";
import PageBody from "@/components/PageBody";
import Footer from "@/components/Footer";

export default async function HomePage() {
  return (
    <main className="HomePage">
      <NavBar />
      <PageBody />
      <Footer />
    </main>
  );
}
