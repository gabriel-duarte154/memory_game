import randomArray from './random_array';
import getPokemons from './getPokemon';
import { useState } from 'react';

function pokemonModule() {
  const [pokemons, setPokemons] = useState([]);

  const getRandomPokemons = (amount) => {
    return getPokemons(amount);
  };
  const shufllePokemons = () => {
    const shuflleArr = randomArray(pokemons);
    return shuflleArr;
  };

  return { getRandomPokemons, shufllePokemons, setPokemons, pokemons };
}

export default pokemonModule;
