import React, { useState } from 'react'
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

//import SearchNotFound from '../SearchNotFound'
import MoreMenu from '../MoreMenu'
import { AuthorsPropType } from '../../types'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'birthYear', label: 'Birth Year', alignRight: false },
  { id: 'books', label: 'Books', alignRight: false },
  { id: 'biography', label: 'Biography', alignRight: false },
  { id: 'userbtn' },
]

// ----------------------------------------------------------------------

export default function AuthorsTable({ authors }: AuthorsPropType) {
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - authors.length) : 0
  // // const isAuthorsNotFound = authors.length === 0

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
            {authors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  birthYear,
                  biography,
                  books,
                } = row

                return (
                  <TableRow hover key={_id} tabIndex={-1}>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {firstName} {lastName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{birthYear}</TableCell>
                    <TableCell align="left">
                      <List>
                        {books && books.length > 0 ? (
                          books.map((book) => (
                            <ListItem key={book._id}>{book.title}</ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <Typography variant="body2">
                              DATA MISSING
                            </Typography>
                          </ListItem>
                        )}
                      </List>
                    </TableCell>
                    <TableCell align="left">{biography}</TableCell>
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

          {/* {isAuthorsNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={searchValue} />
                </TableCell>
              </TableRow>
            </TableBody>
          )} */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={authors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
