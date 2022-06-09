import React from 'react'
import { Button } from '@mui/material'

import Iconify from '../Iconify'
import { BookPropType } from '../../types'

export default function BorrowReturnButton({ book }: BookPropType) {
  const isBookAvailable = book.status === 'AVAILABLE'
  return (
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
    >
      {isBookAvailable ? 'Borrow' : 'Return'}
    </Button>
  )
}
