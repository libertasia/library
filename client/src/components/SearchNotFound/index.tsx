import { Paper, Typography } from '@mui/material'

// ----------------------------------------------------------------------

export type SearchNotFoundPropType = {
  searchQuery: string
  [x: string]: any
}

export default function SearchNotFound({
  searchQuery = '',
  ...other
}: SearchNotFoundPropType) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong> with selected filters. Try
        checking for typos or using complete words.
      </Typography>
    </Paper>
  )
}
