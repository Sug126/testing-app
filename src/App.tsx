import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';


const App: React.FC = () => {
  const [swCharacter, setSwCharacter] = useState("Name");

  const getCharacters = async () => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/1`);
    const json = await apiResponse.json();
    setSwCharacter(json.name);
  };

  useEffect(() => {
    getCharacters();
  });


  return (
    <div className="App">
      <header className="App-header">SWAPI - The Star Wars API</header>
      <p>first person on the page - {swCharacter}</p>
    </div>
  );
}


export default App;
