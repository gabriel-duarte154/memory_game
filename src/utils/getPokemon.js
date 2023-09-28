import { v4 as uuidv4 } from 'uuid';

async function getPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, sprites } = await response.json();

  const isShiny = Math.random() > 0.95 ? true : false;

  return {
    name: name,
    sprit: sprites[isShiny ? 'front_shiny' : 'front_default'],
    id: uuidv4(),
    isShiny,
  };
}

async function getPokemons(amount) {
  const pokemonsId = getPokemonsId(amount);
  const promises = [];

  pokemonsId.forEach((id) =>
    promises.push(new Promise((r) => r(getPokemonData(id))))
  );

  const pokemons = await Promise.all(promises);

  return pokemons;
}

function getPokemonsId(amount) {
  const ids = [];
  for (let i = 0; i < amount; i++) {
    let id;
    do {
      id = getRandomPokemonId();
    } while (ids.includes(id));
    ids.push(id);
  }
  return ids;
}

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

export default getPokemons;
