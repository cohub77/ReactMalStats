import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserAnimeList } from './MALService';

const AnimeList = () => {
  const { username } = useParams();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserAnimeList(username);
      setAnimeList(data);
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {animeList.map(anime => (
        <div key={anime.id}>{anime.title}</div>
      ))}
    </div>
  );
};

export default AnimeList;
