import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsernameInput from './components/UsernameInput';
import AnimeList from './components/AnimeList';
import './styles/AnimeList.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UsernameInput />} />
          <Route path="/animelist/:username" element={<AnimeList />} />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
