import React from 'react';
import { generateCodeVerifier } from './pkce';

const MAL_CLIENT_ID = process.env.REACT_APP_MAL_CLIENT_ID;
const REDIRECT_URL = 'http://localhost:3000/animelist';

const MALLoginComponent = () => {
    const handleLogin = () => {
        const codeVerifier = generateCodeVerifier();
        localStorage.setItem('codeVerifier', codeVerifier);
        const authorizationUrl = `https://myanimelist.net/v1/oauth2/authorize?client_id=${MAL_CLIENT_ID}&response_type=code&scope=write:users&code_challenge=${codeVerifier}&code_challenge_method=plain`;
        window.location.href = authorizationUrl;
      };      

  return (
    <div>
      <button onClick={handleLogin}>Login with MyAnimeList</button>
    </div>
  );
};

export default MALLoginComponent;
