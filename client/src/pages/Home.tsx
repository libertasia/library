import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

export default function Home() {
  const [currentUser, setCurrentUser] = useState('')

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential
    console.log(tokenId)

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
    async function getCurrentUser() {
      const res = await axios.get('/api/v1/users/current')
      setCurrentUser(res.data.email)
    }
    getCurrentUser()
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
