import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const fetchPokemonData = () => {
    if (!pokemonName.trim()) {
      alert('Por favor, ingrese un nombre o ID de Pokémon válido.');
      return;
    }
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error al realizar la solicitud:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPokemonData();
  };

  const handleChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleClear = () => {
    setData(null);
    setPokemonName('');
  };

  return (
    <div class ="container">
      <br></br>
      <form onSubmit={handleSubmit}>
        <input type="text" class="form-control" value={pokemonName} onChange={handleChange} placeholder="Ingrese el nombre o ID de un Pokémon"/>
        <button type="submit" class="btn btn-success">Buscar Pokémon</button>
        <button type="button" className="btn btn-secondary" onClick={handleClear}>Limpiar</button>
      </form>

      {data ? (
        <div class ="container">
          <br></br>
          <hr></hr>
          <h3>ID: {data.id}</h3>
          <h3>Nombre: {data.name}</h3>          
          <h3>Altura: {data.height/10} Metros</h3>
          <h3>Peso: {data.weight/10} Kilos</h3>
          <h3>Movimiento N° 1: {data.abilities[0].ability.name}</h3>
          {
            data && data.abilities && data.abilities[1] && data.abilities[1].ability && data.abilities[1].ability.name
              ? <h3>Habilidad N° 2: {data.abilities[1].ability.name}</h3>
              : <h3>Habilidad N° 2: No disponible</h3>
          }
          <br></br>
          <hr></hr>
          <h3>Sprites Pokemón: </h3>
          <img src={data.sprites.front_default} alt="Front Pokemon img" width="200" height="200"></img>
          <img src={data.sprites.back_default} alt="Front Pokemon img" width="200" height="200"></img>
          <img src={data.sprites.front_shiny} alt="Front Pokemon img" width="200" height="200"></img>
          <img src={data.sprites.back_shiny} alt="Front Pokemon img" width="200" height="200"></img>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre>*/} 
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
