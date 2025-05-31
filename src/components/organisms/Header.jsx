import "./Header.css"
import { HeaderOption } from "../atoms/HeaderOption"
import { Branding } from "../molecules/Branding"

export const Header = () => {
    return (
        <header className="header">
            <div className="headerSections  ">

                <Branding></Branding>

                <div className="options">
                    <HeaderOption to='/'>Home</HeaderOption>
                    <HeaderOption to='/game'>Game</HeaderOption>
                    <HeaderOption to='/pokemonsList'>Pokemons</HeaderOption>
                    <HeaderOption to='/types'>Types</HeaderOption>
                    <HeaderOption to='/generations'>Generations</HeaderOption>
                </div>
            </div>
        </header>
    )
}
