const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 3001;
app.use(cors());

const fetchAllPages = async (username, offset = 0, limit = 100, allData = []) => {
    const fields = 'id,title,main_picture,list_status';
    //const fields = 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,genres,created_at,updated_at,media_type,status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,studios,list_status';
    const response = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist?fields=${fields}&offset=${offset}&limit=${limit}&status=completed`, {
        headers: { 'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID },
    });
    allData.push(...response.data.data);

    if (response.data.paging && response.data.paging.next) {
        const nextOffset = new URL(response.data.paging.next).searchParams.get('offset');
        return fetchAllPages(username, nextOffset, limit, allData);
    }
    return allData;
};

app.get('/anime/:username', async (req, res) => {
    try {
        const animeList = await fetchAllPages(req.params.username);
        console.log("Completed API Response from MyAnimeList");
        res.json(animeList);
    } catch (error) {
        console.error('Error fetching anime list:', error);
        res.status(error.response ? error.response.status : 500).send('Error fetching anime list');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
