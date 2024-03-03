import React, { useState, useEffect } from 'react';
import { getUserAnimeList } from './MALService';
import { useParams } from 'react-router-dom';

const AnimeList = () => {
  const { username } = useParams();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserAnimeList(username);
      if (data) {
        setAnimeList(data); // Update this line
      }
    };

    fetchData();
  }, [username]);
  
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
