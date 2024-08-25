import { useState,useEffect,useRef } from "react"
import PokemonCard from "./PokemonCard";
import PokemonDialog from "./PokemonDialog";
import Spinner from "./Spinner";

function PokemonGrid({searchValue}){

    const [pokemons,setPokemons] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedPokemon,setSelectedPokemon]=useState(null);
    const dialogRef=useRef(null);
    const [pokemonRenderNumber,setPokemonRenderNumber] = useState(20);
    
   
    function handleClick(id){
        setSelectedPokemon(pokemons.find(pokemon => pokemon.id === id));
    }

    function handleDialogClose(){
        dialogRef.current.close();
        setSelectedPokemon(null);
    }

    function capitalizeString(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleLoadMore(){
        setPokemonRenderNumber(prevPokemonRenderNumber=>prevPokemonRenderNumber+20);
    }

    useEffect(()=>{

        async function fetchPokemons(){

            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
            const data = await response.json();

            const pokemonData = await Promise.all(

                data.results.map(async result =>{
                    const response = await fetch(result.url);
                    const data = await response.json();
                    return data;
                })
            )
            
            setPokemons(pokemonData);
            setLoading(false);
        }
        
        
        fetchPokemons();
    },[])

    useEffect(()=>{
        if(dialogRef.current !== null){

            dialogRef.current.showModal();
        }
        
    },[selectedPokemon])

    function typeColour(type) {

        switch (type) {
            case "grass":
                return { backgroundColor: "#27ae60" }
            case "water":
                return { backgroundColor: "#3498db" }
            case "fire":
                return { backgroundColor: "#e67e22" }
            case "normal":
                return { backgroundColor: "#bcbcbc" }
            case "fighting":
                return { backgroundColor: "#b33939", color: "white" }
            case "flying":
                return { backgroundColor: "#a29bfe" }
            case "poison":
                return { backgroundColor: "#a178d9" }
            case "ground":
                return { backgroundColor: "#ffb142" }
            case "rock":
                return { backgroundColor: "#cc8e35" }
            case "bug":
                return { backgroundColor: "#A3CB38" }
            case "ghost":
                return { backgroundColor: "#82589F", color: "white" }
            case "steel":
                return { backgroundColor: "#747d8c" }
            case "electric":
                return { backgroundColor: "#f1c40f" }
            case "psychic":
                return { backgroundColor: "#e84393" }
            case "ice":
                return { backgroundColor: "#74b9ff" }
            case "dragon":
                return { backgroundColor: "#4834d4", color: "white" }
            case "dark":
                return { backgroundColor: "#4f4f4f", color: "white" }
            case "fairy":
                return { backgroundColor: "pink" }

        }
    }

    return(
        <>
            {loading ? <Spinner /> : 

                <div className="content-container">
                    <div className="pokemon-grid">
                        { searchValue =="" ? 
                            
                            pokemons.slice(0,pokemonRenderNumber).map(pokemon=>(
                                <PokemonCard 
                                    key={pokemon.id} 
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    sprite={pokemon.sprites.front_default}
                                    handleClick={handleClick}
                                    types={pokemon.types}
                                    typeColour={typeColour}
                                    capitalizeString={capitalizeString}
                                />
                            ))
                            
                            : pokemons.filter(pokemon=>pokemon.name.includes(searchValue))
                                .map(pokemon => <PokemonCard
                                    key={pokemon.id}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    sprite={pokemon.sprites.front_default}
                                    handleClick={handleClick}
                                    types={pokemon.types}
                                    typeColour={typeColour}
                                    capitalizeString={capitalizeString}
                                />)
                        
                        }
                    </div>

                    {selectedPokemon &&

                        <PokemonDialog 
                            name={selectedPokemon.name}
                            spriteFront={selectedPokemon.sprites.front_default} 
                            spriteBack={selectedPokemon.sprites.back_default}
                            types={selectedPokemon.types} 
                            ref={dialogRef}
                            handleDialogClose={handleDialogClose}
                            typeColour={typeColour}
                            stats={selectedPokemon.stats}
                            capitalizeString={capitalizeString}
                                
                        />
                    }
                    
                    {pokemonRenderNumber!==200 && searchValue == ""? 
                    
                        <button onClick={handleLoadMore} className="load-more">Load more</button> : ""
                    }
                </div>
            }


                
            
        </>
    )

}

export default PokemonGrid