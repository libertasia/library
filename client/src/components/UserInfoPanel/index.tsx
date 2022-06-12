import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Link, Typography, Avatar } from '@mui/material'

import { AppState } from '../../types'

// ----------------------------------------------------------------------

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[300],
}))

// ----------------------------------------------------------------------

export default function UserInfoPanel() {
  const { user } = useSelector((state: AppState) => state.user)

  const isUserExists = user?.email ? true : false

  return (
    <Box sx={{ mb: 5, mx: 2.5 }}>
      <Link underline="none" component={RouterLink} to="#">
        {isUserExists ? (
          <AccountStyle>
            <Avatar alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.userName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user?.role}
              </Typography>
            </Box>
          </AccountStyle>
        ) : (
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Register for more features
              </Typography>
            </Box>
          </AccountStyle>
        )}
      </Link>
    </Box>
  )
}
