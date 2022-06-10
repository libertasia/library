import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

export default function Login() {
  const [currentUser, setCurrentUser] = useState('')

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential
    console.log(`got tokenId from google: ${tokenId}`)

    await axios.post(
      '/api/v1/auth/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    )
  }

  useEffect(() => {
    axios
      .get('/api/v1/users/current', { withCredentials: true })
      .then((res) => {
        const currentEmail = res.data.email || 'Anonymous user'
        setCurrentUser(currentEmail)
      })
  }, [])

  const clientId =
    '795168561931-jjtt0ika6lajfjlke65rn0kfcg16gvaf.apps.googleusercontent.com'
  return (
    <header className="App-header">
      <p>Hello</p>
      <p color="black">{currentUser}</p>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess} />
      </GoogleOAuthProvider>
    </header>
  )
}
