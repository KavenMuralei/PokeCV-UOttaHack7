import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pokemon-detail.css'; // Import the new CSS file

type PokemonDetailProps = {
  pokemon: { id: number; name: string };
  onBack: () => void;
};

type PokemonDetails = {
  id: number;
  name: string;
  description: string;
  types: { type: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onBack }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await response.json();

        // Fetching additional species details for description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const descriptionEntry = speciesData.flavor_text_entries.find(
          (entry: { language: { name: string } }) => entry.language.name === 'en'
        );

        setDetails({
          id: data.id,
          name: data.name,
          description: descriptionEntry ? descriptionEntry.flavor_text : '',
          types: data.types,
          sprites: data.sprites,
        });
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };
    fetchPokemonDetails();
  }, [pokemon]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 pokemon-detail">
      <button className="btn btn-secondary mb-3" onClick={onBack}>Back</button>
      <div className="pokemon-detail-info">
        <div className="pokemon-image-container">
          <h3>#{details.id}</h3>
          <img
            src={details.sprites.other['official-artwork'].front_default}
            alt={details.name}
            className="pokemon-image-large"
          />
          <h1>{details.name}</h1>
          <p><strong>Type:</strong> {details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        </div>
        <div className="pokemon-description">
          <p><strong>Description:</strong> {details.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
