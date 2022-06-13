import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Button } from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import Iconify from '../Iconify'
import { BookPropType, AppState, BooksState } from '../../types'
import { borrowBook, returnBook, resetBookStatus } from '../../redux/actions'

export default function BorrowReturnButton({ book }: BookPropType) {
  const dispatch = useDispatch()

  const { user } = useSelector((state: AppState) => state.user)

  const { isBookReturned, isBookBorrowed, error } = useSelector(
    (state: AppState) => state.booksData
  )

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  const isUserExists = user?.email ? true : false

  const isBookAvailable = book.status === 'AVAILABLE'

  const handleBtnClick = (bookId: string, userId: string) => {
    if (isBookAvailable) {
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(
        borrowBook(bookId, userId)
      )
    } else {
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(
        returnBook(bookId, userId)
      )
    }
  }

  const handleSuccessSnackbarClose = () => {
    setIsSuccessVisible(false)
  }

  const handleErrorSnackbarClose = () => {
    setIsErrorVisible(false)
  }

  useEffect(() => {
    ;(dispatch as ThunkDispatch<BooksState, void, Action>)(resetBookStatus())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true)
    }

    if (isBookBorrowed || isBookReturned) {
      setIsSuccessVisible(true)
    }
  }, [error, isBookBorrowed, isBookReturned])

  return user && isUserExists ? (
    <>
      {isBookBorrowed || isBookReturned ? (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={isSuccessVisible}
          autoHideDuration={5000}
          onClose={handleSuccessSnackbarClose}
        >
          <Alert
            onClose={handleSuccessSnackbarClose}
            sx={{ marginBottom: 2 }}
            severity="success"
          >
            {`Book ${
              (isBookBorrowed ? 'borrowed' : '') ||
              (isBookReturned ? 'returned' : '')
            } successfully!`}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isErrorVisible}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          sx={{ marginBottom: 2 }}
          severity="error"
        >
          {`Could not ${isBookAvailable ? 'borrow' : 'return'} book: ${error}`}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        aria-label={isBookAvailable ? 'borrow book' : 'return book'}
        startIcon={
          isBookAvailable ? (
            <Iconify icon="bx:book-add" />
          ) : (
            <Iconify icon="bx:book" />
          )
        }
        onClick={() => handleBtnClick(book._id, user._id)}
      >
        {isBookAvailable ? 'Borrow' : 'Return'}
      </Button>
    </>
  ) : (
    <></>
  )
}
