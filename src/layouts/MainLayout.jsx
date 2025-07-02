import { Outlet } from "react-router";
import { Footer } from "../components/organisms/Footer";
import { Header } from "../components/organisms/header";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};
