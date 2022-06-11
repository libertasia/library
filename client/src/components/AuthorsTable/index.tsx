import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
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
  Box,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import SearchNotFound from '../SearchNotFound'
import MoreMenu from '../MoreMenu'
import {
  AppState,
  AuthorPropType,
  AuthorsPropType,
  AuthorsState,
} from '../../types'
import { getFilteredAuthors } from '../../helpers'
import { deleteAuthor, resetBooksLoadedStatus } from '../../redux/actions'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'collapseIcon' },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'birthYear', label: 'Birth Year', alignRight: false },
  { id: 'books', label: 'Books', alignRight: false },
  { id: 'userbtn' },
]

// ----------------------------------------------------------------------

function AuthorsTableRow({ author }: AuthorPropType) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const { _id, firstName, lastName, birthYear, biography, books } = author

  const handleDeleteAuthor = (authorId: string) => {
    ;(dispatch as ThunkDispatch<AuthorsState, void, Action>)(
      deleteAuthor(authorId)
    )
  }

  return (
    <>
      <TableRow hover key={_id} tabIndex={-1}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {firstName} {lastName}
          </Typography>
        </TableCell>
        <TableCell align="left">{birthYear}</TableCell>
        <TableCell align="left">
          <List sx={{ margin: 0, padding: 0 }}>
            {books && books.length > 0 ? (
              books.map((book) => (
                <ListItem sx={{ margin: 0, padding: 0 }} key={book._id}>
                  {book.title}
                </ListItem>
              ))
            ) : (
              <ListItem sx={{ margin: 0, padding: 0 }}>
                <Typography variant="body2">DATA MISSING</Typography>
              </ListItem>
            )}
          </List>
        </TableCell>
        <TableCell align="right">
          <MoreMenu
            onDeleteBtnClick={() => handleDeleteAuthor(_id)}
            route={`/dashboard/updateAuthor/${_id}`}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Biography
              </Typography>
              <Typography variant="body2">{biography}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function AuthorsTable({ authors }: AuthorsPropType) {
  const dispatch = useDispatch()

  const { authorsFilterValue } = useSelector((state: AppState) => state.ui)
  const { successCode, error } = useSelector((state: AppState) => state.authors)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSuccessSnackbarClose = () => {
    setIsSuccessVisible(false)
  }

  const handleErrorSnackbarClose = () => {
    setIsErrorVisible(false)
  }

  const filteredAuthors = getFilteredAuthors(authors, authorsFilterValue)

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredAuthors.length)
      : 0

  const isAuthorsNotFound = filteredAuthors.length === 0

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true)
    }

    if (successCode === 204) {
      setIsSuccessVisible(true)
      dispatch(resetBooksLoadedStatus())
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
            Author deleted successfully!
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
            Could not delete author: {error}
          </Alert>
        </Snackbar>
        <Table>
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="15%" />
            <col width="30%" />
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
            {filteredAuthors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((author) => (
                <AuthorsTableRow key={author._id} author={author} />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {isAuthorsNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={authorsFilterValue} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ paddingLeft: 2, marginRight: 1 }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAuthors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
