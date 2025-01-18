import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './header.css';

type HeaderProps = {
  onSearch: (event: React.FormEvent) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm, setSearchTerm }) => {
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const names = data.results.map((pokemon: { name: string }) => pokemon.name);
        // This fetches the names for possible future use, but we won't use it here.
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
      }
    };
    fetchPokemonNames();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Kanto Pokedex</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex ms-auto" onSubmit={onSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Pokémon"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button className="btn search-button" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
