function PokemonCard({ id, name, sprite, types, typeColour, capitalizeString,handleClick}){

    return(
        <>
            <button type="button" className="pokemon-card" onClick={()=>handleClick(id)}>
                <img src={sprite} alt="name" className="sprite"/>
                <h2 className="pokemon-name">{capitalizeString(name)}</h2>
                <ul className="pokemon-types">
                    {types.map(type=>{
                        return(
                            <li key={type.slot} className="type" style={typeColour(type.type.name)}>
                                {capitalizeString(type.type.name)}
                            </li>
                        )
                    })}
                </ul>
                
            </button>
        </>
    )

}

export default PokemonCard