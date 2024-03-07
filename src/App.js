import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsernameInput from './components/UsernameInput';
import AnimeList from './components/AnimeList';
import './styles/AnimeList.css';
import OAuthInput from './components/OAuthInput';
import OAuthHandler from './components/OAuthHandler';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<OAuthInput />} />
          <Route path="/animelist" element={<UsernameInput />} />
          <Route path="/animelist/:username" element={<AnimeList />} />
          <Route path="/oauth-redirect" element={<OAuthHandler />} />
          {/* ... other routes ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
