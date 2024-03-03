import admin from 'firebase-admin';
import axios from 'axios';
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
//console.log("db:", db);

export const handler = async (event) => {
    //console.log("Event:", JSON.stringify(event, null, 2));
    const pathSegments = event.rawPath.split('/');
    // Assuming the username is the second segment in the path
    const username = pathSegments[1];
    let animeList;

    try {
        // Check if data is available in Firestore
        const doc = await db.collection('users').doc(username).get();
        if (doc.exists) {
            console.log('Data available in Firestore');
            animeList = doc.data().animeList;
        } else {
            console.log('Data not available in Firestore');
            // Data not in Firestore, fetch from API
            animeList = await fetchAllPages(username);

            // Store in Firestore
            await db.collection('users').doc(username).set({ animeList });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(animeList),
        };
    } catch (error) {
        console.error('Error:', error);
        // Error handling
    }
};

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
