
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter"
import { getTagColor } from "../../utils/getTagColor.js"
import { getTypeColor } from "../../utils/getTypeColor"
import "./PokemonTags.css"

export const PokemonTags = ({ types = [] }) => {

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {
                types.map((type, index) => {
                    return (
                        <div key={index} className="tagCard" style={{ backgroundColor: getTagColor(type) }}>
                            <p>{capitalizeFirstLetter(type)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
