import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'

import UpdateBookForm from '../components/UpdateBookForm'
import { AppState, BooksState } from '../types'
import { getBookById } from '../redux/actions'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}))

// ----------------------------------------------------------------------

export default function UpdateBook() {
  const dispatch = useDispatch()

  const { _id } = useParams<{ _id: string }>()

  const { book } = useSelector((state: AppState) => state.booksData)

  const bookData = useSelector((state: AppState) =>
    state.booksData.books.find((el) => el._id === _id)
  )

  useEffect(() => {
    if (_id) {
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(getBookById(_id))
    }
  }, [dispatch, _id])

  const bookInfo = !bookData ? book[0] : bookData

  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Update Book.
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Just fill in the form below.
          </Typography>

          <UpdateBookForm book={bookInfo} />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
