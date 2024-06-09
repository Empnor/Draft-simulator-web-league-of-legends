import React, { useEffect, useState } from 'react';
import './App.css';
import placeholder from './placeholder.png';

function App() {
  const [champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [blueteam, setblueteam] = useState(new Array(5).fill(placeholder));
  const [Redteam, setRedteam] = useState(new Array(5).fill(placeholder));
  const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);

  useEffect(() => {
    fetch('champions.json')
      .then(response => response.json())
      .then(data => setChampions(data.champions))
      .catch(error => console.error("Error fetching champion data:", error));
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handlePlaceholderClick = (column, index) => {
    setSelectedPlaceholder({ column, index });
  };

  const handleChampionClick = champion => {
    if (selectedPlaceholder) {
      const { column, index } = selectedPlaceholder;
      if (column === 'left') {
        const updatedblueteam = [...blueteam];
        updatedblueteam[index] = champion;
        setblueteam(updatedblueteam);
      } else if (column === 'right') {
        const updatedRedteam = [...Redteam];
        updatedRedteam[index] = champion;
        setRedteam(updatedRedteam);
      }
      setSelectedPlaceholder(null);
    }
  };

  const filteredChampions = champions.filter(champion =>
    champion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Draft Simulator</h1>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Find champion"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="ChampionContainer">
        <div className="column">
          <h2 className='Red'>Red team</h2>
          {blueteam.map((champion, index) => ( 
            <div 
              key={index} 
              className={`ChampionPlaceholder ${selectedPlaceholder && selectedPlaceholder.column === 'left' && selectedPlaceholder.index === index ? 'selected' : ''}`}
              onClick={() => handlePlaceholderClick('left', index)}
            >
              <img src={champion === placeholder ? placeholder : `champion/${champion}.png`} alt={champion} />
            </div>
          ))}
        </div>
        <div className="ChampionList">
          {filteredChampions.map((champion, index) => (
            <div
              key={index}
              className="champion"
              onClick={() => handleChampionClick(champion)}
            >
              <img src={`champion/${champion}.png`} alt={champion} />
              <div className="ChampionName">{champion}</div>
            </div>
          ))}
        </div>
        <div className="column">
          <h2 className='Blue'>Blue team</h2>
          {Redteam.map((champion, index) => (
            <div 
              key={index} 
              className={`ChampionPlaceholder ${selectedPlaceholder && selectedPlaceholder.column === 'right' && selectedPlaceholder.index === index ? 'selected' : ''}`}
              onClick={() => handlePlaceholderClick('right', index)}
            >
              <img src={champion === placeholder ? placeholder : `champion/${champion}.png`} alt={champion} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
