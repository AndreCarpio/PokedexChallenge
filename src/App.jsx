import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Game } from './pages/Game'
import { NotFound } from './pages/NotFound'
import { PokemonsList } from './pages/PokemonsList'
import { PokemonDescription } from './pages/PokemonDescription'
import { Types } from './pages/Types'
import { Generations } from './pages/Generations'
import { Header } from './components/organisms/header'



export const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={
          <h1>Home</h1>
        } />

        <Route path='/game' element={
          <Game></Game>
        } />

        <Route path='/pokemonsList' element={
          <PokemonsList></PokemonsList>
        } />

        <Route path='/pokemonDescription' element={
          <PokemonDescription></PokemonDescription>
        } />

        <Route path='/types' element={
          <Types></Types>
        } />

        <Route path='/generations' element={
          <Generations></Generations>
        } />

        <Route path='*' element={
          <NotFound></NotFound>
        } />

      </Routes>
    </BrowserRouter>

  )
}
