import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Stack, Container, Typography } from '@mui/material'

import { getCurrentUser } from '../redux/actions'
import { UserState } from '../types'
import { API_URL } from '../config'

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const clientId =
    '795168561931-jjtt0ika6lajfjlke65rn0kfcg16gvaf.apps.googleusercontent.com'

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential

    await axios.post(
      `${API_URL}/api/v1/auth/google-login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
        withCredentials: true,
      }
    )
    ;(dispatch as ThunkDispatch<UserState, void, Action>)(getCurrentUser())

    navigate('/dashboard/books', { replace: true })
  }

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Log in using your Google Account.
        </Typography>
      </Stack>

      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleSuccess} />
      </GoogleOAuthProvider>
    </Container>
  )
}
