import React, { useState } from 'react';
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

import './App.css';

function App() {
  const [token, setToken] = useState('')
  console.log('token:', token)
  const handleSucess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential
    console.log('tokenId:', tokenId)

    const res = await axios.post(
      'http://localhost:5000/api/v1/auth/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    )
    const token = res.data.token
    setToken(token)
  }

  const clientId ='795168561931-jjtt0ika6lajfjlke65rn0kfcg16gvaf.apps.googleusercontent.com'

  return (
    <div className="App">
      <header className="App-header">
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSucess} />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default App;
