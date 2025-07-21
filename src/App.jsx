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
          loader: async () => {
            try {
              let res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
              );
              if (res.ok) {
                res = await res.json();
                res = shuffleArrary(res.results);
                return res;
              } else {
                throw new Error("Error to get data");
              }
            } catch (error) {
              console.log("Error to get data: " + error);
              return [];
            }
          },
          element: <Game />,
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
  /* <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1>Home</h1>} />

          <Route path="/game" element={<Game />} />

          <Route path="/pokemons" element={<PokemonsList />} />

          <Route path="/pokemons/:pokemonId" element={<PokemonDescription />} />

          <Route path="/types" element={<Types />} />

          <Route path="/generations" element={<Generations />} />

          <Route path="/buttonGallery" element={<ButtonGallery />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter> */
};
