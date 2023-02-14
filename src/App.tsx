import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';


const App: React.FC = () => {
  const [swCharacter, setSwCharacter] = useState();
  const [error, setError] = useState("try again" );

  const getCharacters = async () => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/1`);
    if(apiResponse.ok){
      const json = await apiResponse.json()
      //console.log(json)
      setSwCharacter(json.name)}
      else if (apiResponse.status === 418) {
        setError("418 I'm a tea pot 🫖");
      
    }
   
  };

  useEffect(() => {
    getCharacters();
  });


  return (
    <div className="App">
      <header className="App-header">SWAPI - The Star Wars API</header>
      {swCharacter && (
        <p>First Person from the Star War People - {swCharacter}</p>
      )}
      {!swCharacter && <p>{error}</p>}
    </div>
  );

}


export default App;
