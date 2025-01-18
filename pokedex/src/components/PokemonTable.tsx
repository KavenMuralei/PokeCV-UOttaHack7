import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './grid.css';
import './PokemonDetail';

type Pokemon = {
  name: string;
  url: string;
  id: number;
};


type PokemonTableProps = {
  onSelectPokemon: (pokemon: Pokemon) => void;
};

const PokemonTable: React.FC<PokemonTableProps> = ({ onSelectPokemon }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const offset = (currentPage - 1) * 16; // Change to 16 per page for a 4x4 grid
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=16`);
        const data = await response.json();

        // Add IDs to the Pokémon data
        const updatedData = data.results.map((pokemon: Pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return { ...pokemon, id: Number(id) };
        });

        setPokemonList(updatedData);
        setTotalPages(Math.ceil(151 / 16)); // Adjust totalPages for 16 per page
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchPokemon();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="container mt-5">
      <h1>Pokémon Grid</h1>
      <div className="grid-container">
        {pokemonList.map((pokemon) => (
          <button
            key={pokemon.id}
            className="btn grid-button"
            onClick={() => onSelectPokemon(pokemon)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <span>{pokemon.id}. {pokemon.name}</span>
          </button>
        ))}
      </div>
      <div className="pagination-container">
        <button
          className="btn btn-secondary me-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonTable;
