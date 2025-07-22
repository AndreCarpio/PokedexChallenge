import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import "./App.css";
import { Game } from "./pages/Game";
import { NotFound } from "./pages/NotFound";
import { PokemonsList } from "./pages/PokemonsList";
import { PokemonDescription } from "./pages/PokemonDescription";
import { Types } from "./pages/Types";
import { Generations } from "./pages/Generations";
import { MainLayout } from "./layouts/MainLayout";
import { ButtonGallery } from "./pages/ButtonGallery";
import { shuffleArrary } from "./utils/shuffleArray";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <h1>Home</h1> },
        {
          path: "game",
          lazy: async () => {
            const [module, loaderModule] = await Promise.all([
              import("./pages/Game"),
              (async () => {
                const res = await fetch(
                  "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
                );
                const data = await res.json();
                return () => shuffleArrary(data.results);
              })(),
            ]);
            return {
              Component: module.Game,
              loader: loaderModule,
            };
          },
        },
        { path: "pokemons", element: <PokemonsList /> },
        { path: "pokemons/:pokemonId", element: <PokemonDescription /> },
        { path: "types", element: <Types /> },
        { path: "generations", element: <Generations /> },
        { path: "buttonGallery", element: <ButtonGallery /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
