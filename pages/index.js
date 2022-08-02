import Link from "next/Link";
import HomeCss from "../styles/Home.module.css";
import Image from "next/Image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home({ arrayPokemon2, tipos }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemAnimado = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };

  const [pokemon, setPokemon] = useState(arrayPokemon2);

  const filtrar = (elTipo) => {
    setPokemon(arrayPokemon2);

    if (elTipo === "borrar") {
      setPokemon(arrayPokemon2);
    } else {
      let nuevoPokemon = arrayPokemon2
        .filter((pokemon) =>
          pokemon.type.some((tipo) => tipo.type.name === elTipo)
        )
        .map((pokemones) => {
          let nuevoPokemones = { ...pokemones };
          return nuevoPokemones;
        });
      setPokemon(nuevoPokemon);
      console.log(nuevoPokemon);
    }
  };
  return (
    <>
      <div className={HomeCss.botonesTipo}>
        <button
          className={HomeCss.botonFiltro}
          onClick={() => filtrar("borrar")}
        >
          Mostrar todos
        </button>
        <div className={HomeCss.listadoTipos}>
          {tipos.map((tipo) => {
            return (
              <button
                className={`${HomeCss.botonFiltro} ${tipo.name}`}
                onClick={() => filtrar(tipo.name)}
                key={tipo.name}
              >
                {tipo.name}
              </button>
            );
          })}
        </div>
      </div>
      <h1 className={HomeCss.title}>Pokedex</h1>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className={HomeCss.columnas}
      >
        {pokemon.map((pokemon) => (
          <motion.li variants={itemAnimado} key={pokemon.name}>
            <Link
              href={{
                pathname: "/pokemon/[name]",
                query: { name: pokemon.name },
              }}
            >
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
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}

export async function getServerSideProps() {
  const traeTipos = await fetch("https://pokeapi.co/api/v2/type");
  const tipos = await traeTipos.json();

  const getPokemons = async (numero) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon/${numero}?limit=101&offset=0`
    )
      .then((response) => response.json())
      .then((data) => data);
  };
  let arrayPokemons = [];
  for (let i = 1; i <= 100; i++) {
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
      tipos: tipos.results,
    },
  };
}
