import "./Card.css"

export const Card = ({ pokemonName = "Sin Nombre", pokemonNumber = "#000", imageURL = "", types = [] }) => {
    return (
        <div className="pokemonCard" >
            {pokemonName}
        </div>
    )
}
