import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'

import UpdateAuthorForm from '../components/UpdateAuthorForm'
import { getAuthorById } from '../redux/actions'
import { AuthorsState, AppState } from '../types'

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

export default function UpdateAuthor() {
  const dispatch = useDispatch()

  const { _id } = useParams<{ _id: string }>()

  const { author } = useSelector((state: AppState) => state.authors)

  const authorData = useSelector((state: AppState) =>
    state.authors.authors.find((el) => el._id === _id)
  )

  useEffect(() => {
    if (_id) {
      ;(dispatch as ThunkDispatch<AuthorsState, void, Action>)(
        getAuthorById(_id)
      )
    }
  }, [dispatch, _id])

  const authorInfo = !authorData ? author[0] : authorData

  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Update Author.
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Just fill in the form below.
          </Typography>

          <UpdateAuthorForm author={authorInfo} />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
