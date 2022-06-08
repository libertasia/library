import { sentenceCase } from 'change-case'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
//import Scrollbar from '../Scrollbar'
import SearchNotFound from '../SearchNotFound'
import MoreMenu from '../MoreMenu'
import { AppState, BookType } from '../../types'
import {
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

  const handleChangePage = (event: unknown, newPage: number) => {
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0

  const isBooksNotFound = books.length === 0

  return (
    <>
      <TableContainer>
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
                    <List>
                      {authors ? (
                        authors.map((author) => (
                          <ListItem key={author._id}>
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

                  <TableCell align="right">
                    <MoreMenu />
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
