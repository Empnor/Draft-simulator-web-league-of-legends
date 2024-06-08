import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('champions.json')
      .then(response => response.json())
      .then(data => setChampions(data.champions))
      .catch(error => console.error("Error fetching champion data:", error));
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredChampions = champions.filter(champion =>
    champion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Draft Simulator</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a champion"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="champion-container">
        <div className="champion-list">
          {filteredChampions.map((champion, index) => (
            <div key={index} className="champion">
              <img src={`champion/${champion}.png`} alt={champion} />
              <div className="champion-name">{champion}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
