//import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
// import { Card, Link, Container, Typography } from '@mui/material';
import AddAuthorForm from '../components/AddAuthorForm'
// sections
// import { RegisterForm } from '../sections/auth/register';
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  //minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  //padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function AddAuthor() {
  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Add new Author to the Library.
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Just fill in the form below.
          </Typography>

          <AddAuthorForm />

          {/* <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            {''}and{''}
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
