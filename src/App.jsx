import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Game } from "./pages/Game";
import { NotFound } from "./pages/NotFound";
import { PokemonsList } from "./pages/PokemonsList";
import { PokemonDescription } from "./pages/PokemonDescription";
import { Types } from "./pages/Types";
import { Generations } from "./pages/Generations";
import { MainLayout } from "./layouts/MainLayout";
import { ButtonGallery } from "./pages/ButtonGallery";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1>Home</h1>} />

          <Route path="/game" element={<Game />} />

          <Route path="/pokemons" element={<PokemonsList />} />

          <Route path="/pokemons/:pokemonId" element={<PokemonDescription />} />

          <Route path="/types/:typeId" element={<Types />} />

          <Route path="/button-gallery" element={<ButtonGallery />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
