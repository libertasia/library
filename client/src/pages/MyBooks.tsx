import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Stack, Container, Typography } from '@mui/material'

import MyBooksTable from '../components/MyBooksTable'
import { AppState, UserState, BooksState } from '../types'
import { getCurrentUser, resetBookStatus } from '../redux/actions'

export default function MyBooks() {
  const dispatch = useDispatch()

  const { isUserLoaded } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (!isUserLoaded) {
      ;(dispatch as ThunkDispatch<UserState, void, Action>)(getCurrentUser())
    }
  }, [dispatch, isUserLoaded])

  useEffect(() => {
    ;(dispatch as ThunkDispatch<BooksState, void, Action>)(resetBookStatus())
  }, [dispatch])

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          My Books
        </Typography>
      </Stack>

      <MyBooksTable />
    </Container>
  )
}
