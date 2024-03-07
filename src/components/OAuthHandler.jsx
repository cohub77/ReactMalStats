// OAuthHandler.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async (code, codeVerifier) => {
      try {
        console.log("code:", code);
        console.log("codeVerifier:", codeVerifier);
        const postData = JSON.stringify({ code, codeVerifier });
        console.log(postData)
        const response = await axios.post('https://zbapy5hju7prd4pt7q7k2hhbp40frlcf.lambda-url.us-west-1.on.aws/', postData);
        console.log('Token response:', response.data);
        const { access_token } = response.data;
        localStorage.setItem('malAccessToken', access_token);
        navigate('/animelist'); // Navigate to the AnimeList component
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('codeVerifier');
    if (code && codeVerifier) {
      exchangeCodeForToken(code, codeVerifier);
    } else {
      navigate('/'); // Redirect to home page or a relevant page if no code is found
    }
  }, [navigate]);

  return <div>Processing OAuth...</div>;
};

export default OAuthHandler;
