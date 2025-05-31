
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter"
import { getTagColor } from "../../utils/getTagColor.js"
import "./PokemonTags.css"
import { TypeIcon } from "./TypeIcon.jsx"

export const PokemonTags = ({ types = [] }) => {

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {
                types.map((type, index) => {
                    return (
                        <div key={index} className="tagCard" style={{ backgroundColor: getTagColor(type) }}>
                            <div className="tagCardImage">
                                <TypeIcon type={type}></TypeIcon>
                            </div>

                            <p>{capitalizeFirstLetter(type)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
