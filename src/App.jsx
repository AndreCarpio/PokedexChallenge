import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Game } from "./pages/Game";
import { NotFound } from "./pages/NotFound";
import { PokemonsList } from "./pages/PokemonsList";
import { PokemonDescription } from "./pages/PokemonDescription";
import { MainLayout } from "./layouts/MainLayout";
import { ButtonGallery } from "./pages/ButtonGallery";
import { PokemonProvider } from "./context/pokemonListContext";

export const App = () => {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Game />} />

            <Route path="/pokemons" element={<PokemonsList />} />

            <Route
              path="/pokemons/:pokemonId"
              element={<PokemonDescription />}
            />

            <Route path="/button-gallery" element={<ButtonGallery />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
};
