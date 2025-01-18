import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type PokemonDetailProps = {
  pokemon: { id: number; name: string };
  onBack: () => void;
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onBack }) => {
  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={onBack}>Back</button>
      <h1>{pokemon.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      {/* Add more Pokémon details here */}
    </div>
  );
};

export default PokemonDetail;
