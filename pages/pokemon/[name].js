export default function Pokemon({ pokemon }) {
  return (
    <div>
        {pokemon.name}
    </div>
  );
}

export async function getServerSideProps( context ) {
  const { name } = await context.params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();
  return {
    props: {
      pokemon,
    },
  };
}
