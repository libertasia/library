import { useEffect } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Card, Stack, Button, Container, Typography } from '@mui/material'

import Iconify from '../components/Iconify'
// import BooksTableToolbar from '../components/BooksTableToolbar'
// import BooksTable from '../components/BooksTable'
import { AppState, AuthorsState } from '../types'
import { getAuthors } from '../redux/actions'
import AuthorsTable from '../components/AuthorsTable'

export default function Authors() {
  const dispatch = useDispatch()
  const { authors, isAuthorsLoaded } = useSelector(
    (state: AppState) => state.authors
  )

  useEffect(() => {
    if (!isAuthorsLoaded) {
      ;(dispatch as ThunkDispatch<AuthorsState, void, Action>)(getAuthors())
    }
  }, [dispatch, isAuthorsLoaded])

  console.log(authors)

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Authors
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Author
        </Button>
      </Stack>

      {/* <BooksTableToolbar categories={categories} />

      <BooksTable books={books} totalBooksCount={booksCount} /> */}
      <Card>
        <AuthorsTable authors={authors} />
      </Card>
    </Container>
  )
}
