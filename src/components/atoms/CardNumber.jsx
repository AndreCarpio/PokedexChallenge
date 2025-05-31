import { formatToHashNumber } from "../../utils/formatToHashNumber.js"
import "./CardNumber.css"

export const CardNumber = ({ pokemonNumber }) => {

    return (
        <p className='cardNumber '>{formatToHashNumber(pokemonNumber)}</p>
    )
}
