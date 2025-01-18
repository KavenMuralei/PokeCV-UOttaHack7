import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import PokemonTable from './components/PokemonTable';
import PokemonDetail from './components/PokemonDetail';

type Pokemon = {
  name: string;
  url: string;
  id: number;
};

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = await response.json();
      const pokemon: Pokemon = {
        name: data.name,
        url: data.url,
        id: data.id,
      };
      setSelectedPokemon(pokemon);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      alert('Pokémon not found');
    }
  };

  const handleBackButtonClick = () => {
    setSelectedPokemon(null);
    setSearchTerm('');
  };

  return (
    <div>
      <Header onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} suggestions={suggestions} setSuggestions={setSuggestions} />
      {selectedPokemon ? (
        <PokemonDetail pokemon={selectedPokemon} onBack={handleBackButtonClick} />
      ) : (
        <PokemonTable onSelectPokemon={setSelectedPokemon} />
      )}
    </div>
  );
};

export default App;
