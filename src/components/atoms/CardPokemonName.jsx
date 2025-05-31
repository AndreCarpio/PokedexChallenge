import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter.js"
import "./CardPokemonName.css"

export const CardPokemonName = ({ pokemonName }) => {

    return (
        <p className='cardPokemonName'>{capitalizeFirstLetter(pokemonName)}</p>
    )
}
