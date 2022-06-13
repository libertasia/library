import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Card,
} from '@mui/material'

import BorrowReturnButton from '../BorrowReturnButton'
import { AppState, BookType } from '../../types'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'borrowDate', label: 'Borrow Date', alignRight: false },
  { id: 'returnDate', label: 'Return Date', alignRight: false },
  { id: 'btn' },
]

// ----------------------------------------------------------------------

export default function MyBooksTable() {
  const { user } = useSelector((state: AppState) => state.user)

  const isUserExists = user?.email ? true : false

  const userBooks = user?.borrowedBooks

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return isUserExists && userBooks && userBooks.length > 0 ? (
    <Card>
      <TableContainer sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.alignRight ? 'right' : 'left'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {userBooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book: BookType) => {
                const { _id, title, status, borrowDate, returnDate } = book

                return (
                  <TableRow hover key={_id} tabIndex={-1}>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {title}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(borrowDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(returnDate).format('DD/MM/YYYY')}
                    </TableCell>
                    {status === 'BORROWED' ? (
                      <TableCell>
                        <BorrowReturnButton book={book} />
                      </TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ paddingLeft: 2, marginRight: 1 }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userBooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  ) : (
    <Typography variant="body1">You haven't borrowed any books.</Typography>
  )
}
