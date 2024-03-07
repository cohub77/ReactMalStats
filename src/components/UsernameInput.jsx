import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UsernameInput.css';

const UsernameInput = ({ accessToken }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/animelist/${username}`, { state: { accessToken } });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter MyAnimeList Username"
          className="input-field"
        />
        <button type="submit" className="submit-button">Get Anime List</button>
      </form>
    </div>
  );
};

export default UsernameInput;
