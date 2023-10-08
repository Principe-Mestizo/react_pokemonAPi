// import { useEffect, useState } from "react"
import { useEffect, useState } from "react";
import { Buton } from "./components/Buton"
import './sass/App.scss'
import { TiArrowLeftOutline , TiArrowRightOutline} from "react-icons/ti";
import { Card } from "./components/Card";

export const App = () => {

    const [pokemonId, setPokemonId] = useState(65);
    const [pokemonEvolution, setPokemonEvolution] = useState([]);
    
    useEffect(() => {
            getEvolutions(pokemonId);
     }, [pokemonId]);

     
    async function getEvolutions(id){
        const response =  await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()
        // console.log(data);

        // creamos un array apra los pokemones y sus evoluciones
        const pokemonArray = [];
        const pokemonLvl= data.chain.species.name;
        const imgPokemon= await getPokemonImgs(pokemonLvl);

        pokemonArray.push([pokemonLvl, imgPokemon]);

        if (data.chain.evolves_to.length !== 0) {
            const pokemonLvl2 = data.chain.evolves_to[0].species.name;
            const imgPokemon2 = await getPokemonImgs(pokemonLvl2);
            pokemonArray.push([pokemonLvl2, imgPokemon2]);

            console.log(pokemonArray);
            
            if(data.chain.evolves_to[0].evolves_to.length !== 0){
                const pokemonLvl3 = data.chain.evolves_to[0].evolves_to[0].species.name;
                const imgPokemon3 = await getPokemonImgs(pokemonLvl3);
                pokemonArray.push([pokemonLvl3, imgPokemon3]);
               
            }

        }
         setPokemonEvolution(pokemonArray);
    }

    async function getPokemonImgs(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const data = await response.json();
        // console.log(data);
        return data.sprites.other['official-artwork'].front_default;

    }
    function prevClick(){
        (pokemonId === 1)?
        setPokemonId(1):
        setPokemonId(pokemonId - 1)
    }


    function nextClick(){
        setPokemonId(pokemonId + 1)
    }
    

    return (
        <div className="app_contenedor">
            {/* <button onClick={increaseNumber}>Next</button>
            <div>
                {pokemonNumber} - {pokemonName}
            </div> */}
            <div className={`card__container card${pokemonEvolution.length}`}>
                {pokemonEvolution.map((pokemon) => 
                    <Card name={pokemon[0]}
                     img={pokemon[1]} 
                     key={pokemon[0]}/>
                )}
             
            </div>
          
            <div className="button_container">
                <Buton icon={<TiArrowLeftOutline/>} 
                        handleCLick ={prevClick}
                />
               
                <Buton icon={<TiArrowRightOutline/>}
                        handleCLick={nextClick}
                />
            </div>
           
            
        </div>
    )
}
