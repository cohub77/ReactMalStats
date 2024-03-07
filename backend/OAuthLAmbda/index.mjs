import axios from 'axios';

const clientId = process.env.MAL_CLIENT_ID;
const clientSecret = process.env.MAL_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

exports.handler = async (event) => {
  const { code, codeVerifier } = JSON.parse(event.body);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', codeVerifier); // Added code verifier

  try {
    const response = await axios.post('https://myanimelist.net/v1/oauth2/token', params, {
      headers: {
        
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const accessToken = response.data.access_token;
    return {
        statusCode: 200,
        headers: { 
          "Access-Control-Allow-Origin": "*" // for CORS
        },
        body: JSON.stringify({ access_token: accessToken }),
      };
      
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
