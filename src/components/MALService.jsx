import axios from 'axios';

const getClientId = () => {
    return process.env.REACT_APP_MAL_CLIENT_ID;
  };  

export const getUserAnimeList = async (username) => {
  try {
    const response = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist`, {
      headers: {
        'X-MAL-CLIENT-ID': getClientId(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching anime list:', error);
  }
};
