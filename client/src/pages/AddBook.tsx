import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'

import AddBookForm from '../components/AddBookForm'

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

export default function AddBook() {
  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Add new Book to the Library.
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Just fill in the form below.
          </Typography>

          <AddBookForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
