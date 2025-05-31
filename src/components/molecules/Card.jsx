import { getTypeColor } from "../../utils/getTypeColor"
import { CardNumber } from "../atoms/CardNumber"
import { CardPokemonName } from "../atoms/CardPokemonName"
import { PokemonTags } from "../atoms/PokemonTags"
import "./Card.css"

export const Card = ({ pokemonName = "Sin Nombre", pokemonNumber = "#000", imageURL = "", types = [] }) => {
    return (
        <div className="pokemonCard" style={{ backgroundColor: getTypeColor(types[0]) }} >
            <div className=' '>
                <CardNumber pokemonNumber={pokemonNumber}></CardNumber>
                <CardPokemonName pokemonName={pokemonName}></CardPokemonName>
            </div>

            <div className=' '>
                <PokemonTags types={types}></PokemonTags>
            </div>
        </div>
    )
}
