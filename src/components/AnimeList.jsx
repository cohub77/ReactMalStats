import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const AnimeList = () => {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    // Check if the access token exists in the location state
    const accessToken = location.state?.accessToken;
    if (!accessToken) {
      console.error('Access token is missing, redirecting to login.');
      // Redirect to login or a relevant page
      navigate('/login');
      return;
    }

    // Fetch the anime list if the access token is available
    fetchAnimeList(username, accessToken);
  }, [username, navigate, location.state]);

  const fetchAnimeList = async (username, accessToken) => {
    try {
      console.log(`Sending request to fetch anime list for ${username} with token...`);
      const response = await axios.get(`https://drp27wmrrckbxfivx57vc5rcda0xlwnt.lambda-url.us-west-1.on.aws/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Anime list fetched:", response.data);
      setAnimeList(response.data);
    } catch (error) {
      console.error('Error fetching anime list:', error);
    }
  };

  return (
    <div className="container anime-list">
      {animeList.map((anime, index) => (
        <div key={index} className="card">
          <img src={anime.node.main_picture.large} alt={anime.node.title} className="anime-image" />
          <h2 className="title">{anime.node.title}</h2>
          <p className="score">Score: {anime.list_status ? anime.list_status.score : 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
