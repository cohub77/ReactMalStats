import axios from 'axios';

export const getUserAnimeList = async (username) => {
    try {
        const response = await axios.get(`https://drp27wmrrckbxfivx57vc5rcda0xlwnt.lambda-url.us-west-1.on.aws/${username}`);
        //const response = await axios.get(`http://localhost:3001/anime/${username}`);
        console.log("User name:", username); // Log the username
        console.log("API Response:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching anime list:', error);
    }
};
