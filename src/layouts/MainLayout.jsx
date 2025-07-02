import { Outlet } from "react-router";
import { Footer } from "../components/organisms/Footer";
import { Header } from "../components/organisms/header";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <div id="mainLayout">
      <Header></Header>
      <main id="pageMainContainer">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};
