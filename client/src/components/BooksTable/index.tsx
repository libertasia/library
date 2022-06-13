import { sentenceCase } from 'change-case'
import React, { useEffect, useState } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  List,
  ListItem,
} from '@mui/material'

import Label from '../Label'
import BorrowReturnButton from '../BorrowReturnButton'
import SearchNotFound from '../SearchNotFound'
import MoreMenu from '../MoreMenu'
import { AppState, BooksState, BookType } from '../../types'
import {
  deleteBook,
  resetAutorsLoadedStatus,
  resetBooksLoadedStatus,
  setPage,
  setRowsPerPage,
} from '../../redux/actions'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'isbn', label: 'ISBN', alignRight: false },
  { id: 'authors', label: 'Authors', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'btn' },
  { id: 'userbtn' },
]

// ----------------------------------------------------------------------

export type BooksTablePropType = {
  books: BookType[]
  totalBooksCount: number
}

export default function BooksTable({
  books,
  totalBooksCount,
}: BooksTablePropType) {
  const dispatch = useDispatch()

  const { searchValue, page, rowsPerPage } = useSelector(
    (state: AppState) => state.ui
  )

  const { successCode, error } = useSelector(
    (state: AppState) => state.booksData
  )

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  const handleChangePage = (event: any | null, newPage: number) => {
    dispatch(setPage(newPage))
    dispatch(resetBooksLoadedStatus())
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPage(0))
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)))
    dispatch(resetBooksLoadedStatus())
  }

  const handleDeleteBook = (bookId: string) => {
    ;(dispatch as ThunkDispatch<BooksState, void, Action>)(deleteBook(bookId))
  }

  const handleSuccessSnackbarClose = () => {
    setIsSuccessVisible(false)
  }

  const handleErrorSnackbarClose = () => {
    setIsErrorVisible(false)
  }

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - books.length) : 0

  const isBooksNotFound = books.length === 0

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true)
    }

    if (successCode === 204) {
      setIsSuccessVisible(true)
      dispatch(resetAutorsLoadedStatus())
    }
  }, [dispatch, error, successCode])

  return (
    <>
      <TableContainer sx={{ paddingLeft: 2, paddingRight: 2 }}>
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
            Book deleted successfully!
          </Alert>
        </Snackbar>
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
            Could not delete book: {error}
          </Alert>
        </Snackbar>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="15%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="auto" />
            <col width="auto" />
          </colgroup>
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
            {books.map((row) => {
              const { _id, title, isbn, category, status, authors } = row

              return (
                <TableRow hover key={_id} tabIndex={-1}>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {title}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{isbn}</TableCell>
                  <TableCell align="left">
                    <List sx={{ margin: 0, padding: 0 }}>
                      {authors ? (
                        authors.map((author) => (
                          <ListItem
                            sx={{ margin: 0, padding: 0 }}
                            key={author._id}
                          >
                            {author.firstName} {author.lastName}
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2">DATA MISSING</Typography>
                      )}
                    </List>
                  </TableCell>
                  <TableCell align="left">{category.title}</TableCell>
                  <TableCell align="left">
                    <Label
                      variant="ghost"
                      color={(status === 'BORROWED' && 'error') || 'success'}
                    >
                      {sentenceCase(status)}
                    </Label>
                  </TableCell>
                  {status === 'AVAILABLE' ? (
                    <TableCell>
                      <BorrowReturnButton book={row} />
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  <TableCell align="right">
                    <MoreMenu
                      onDeleteBtnClick={() => handleDeleteBook(_id)}
                      route={`/dashboard/updateBook/${_id}`}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {isBooksNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={searchValue} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ paddingLeft: 2, marginRight: 1 }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalBooksCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
