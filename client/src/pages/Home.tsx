import { useEffect } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Card, Stack, Button, Container, Typography } from '@mui/material'

import Iconify from '../components/Iconify'
import BooksTableToolbar from '../components/BooksTableToolbar'
import BooksTable from '../components/BooksTable'
import {
  getBooksCount,
  getBooksPaginated,
  getCategories,
} from '../redux/actions'
import { AppState, BooksState, CategoriesState } from '../types'

export default function Home() {
  const dispatch = useDispatch()
  const { categories, isCategoriesLoaded } = useSelector(
    (state: AppState) => state.categories
  )

  const { page, rowsPerPage } = useSelector((state: AppState) => state.ui)

  const { booksCount, isBooksCountLoaded, books, isBooksLoaded } = useSelector(
    (state: AppState) => state.booksData
  )
  useEffect(() => {
    if (!isBooksLoaded) {
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(
        getBooksPaginated(page, rowsPerPage)
      )
    }
  }, [dispatch, isBooksLoaded, page, rowsPerPage])

  useEffect(() => {
    if (!isCategoriesLoaded) {
      ;(dispatch as ThunkDispatch<CategoriesState, void, Action>)(
        getCategories()
      )
    }
  }, [dispatch, isCategoriesLoaded])

  useEffect(() => {
    if (!isBooksCountLoaded) {
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(getBooksCount())
    }
  }, [dispatch, isBooksCountLoaded])

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Books
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Book
        </Button>
      </Stack>

      <Card>
        <BooksTableToolbar categories={categories} />

        <BooksTable books={books} totalBooksCount={booksCount} />
      </Card>
    </Container>
  )
}
