import Link from "next/Link";
import HomeCss from "../styles/Home.module.css";
import Image from 'next/Image'

export default function Home({ arrayPokemon2 }) {
  return (
    <>
      <ul className={HomeCss.columnas}>
        {arrayPokemon2.map((pokemon) => (
          <li key={pokemon.name}>
            <Link href={
              {
                pathname: '/pokemon/[name]',
                query: {name: pokemon.name}
              }
            }>
              <a>
                <div className={`${HomeCss.card} ${pokemon.type[0].type.name}`}>
                  <div className={HomeCss.nombreTipos}>
                    <h3>{pokemon.name}</h3>
                    <div className={HomeCss.tipos}>
                      {pokemon.type.map((tipo) => (
                        <p className={HomeCss.tipo} key={tipo.type.name}>
                          {tipo.type.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Image
                    className={HomeCss.image}
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                    
                  />
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const getPokemons = async (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((response) => response.json())
      .then((data) => data);
  };
  let arrayPokemons = [];
  for (let i = 1; i <= 20; i++) {
    const pokemon = await getPokemons(i);
    arrayPokemons.push(pokemon);
  }

  let arrayPokemon2 = arrayPokemons.map((pokemon) => {
    return {
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      type: pokemon.types,
    };
  });
  return {
    props: {
      arrayPokemon2,
    },
  };
}
