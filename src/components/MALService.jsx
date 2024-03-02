import axios from 'axios';

export const getUserAnimeList = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/anime/${username}`);
        console.log("API Response:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching anime list:', error);
    }
};
