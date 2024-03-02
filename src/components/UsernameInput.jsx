import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsernameInput = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/animelist/${username}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter MyAnimeList Username"
      />
      <button type="submit">Get Anime List</button>
    </form>
  );
};

export default UsernameInput;
