import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Game } from "./pages/Game";
import { NotFound } from "./pages/NotFound";
import { PokemonsList } from "./pages/PokemonsList";
import { PokemonDescription } from "./pages/PokemonDescription";
import { Types } from "./pages/Types";
import { Generations } from "./pages/Generations";
import { Header } from "./components/organisms/header";
import { Footer } from "./components/organisms/Footer";
import { MainLayout } from "./layouts/MainLayout";
import { ButtonGallery } from "./pages/ButtonGallery";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1>Home</h1>} />

          <Route path="/game" element={<Game />} />

          <Route path="/pokemonsList" element={<PokemonsList />} />

          <Route path="/pokemonDescription" element={<PokemonDescription />} />

          <Route path="/types" element={<Types />} />

          <Route path="/generations" element={<Generations />} />

          <Route path="/buttonGallery" element={<ButtonGallery />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
