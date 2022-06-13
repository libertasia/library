import { useState } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Typography, Avatar } from '@mui/material'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

import { AppState, UserState } from '../../types'
import { updateUser } from '../../redux/actions'

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
  const dispatch = useDispatch()

  const { user } = useSelector((state: AppState) => state.user)

  const isUserExists = user?.email ? true : false

  const userRole = user?.role === 'ADMIN' ? 'USER' : 'ADMIN'

  const [checked, setChecked] = useState(false)

  const handleUserRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    ;(dispatch as ThunkDispatch<UserState, void, Action>)(
      updateUser(user?._id, userRole)
    )
  }

  return (
    <Box sx={{ mb: 5, mx: 2.5 }}>
      {isUserExists ? (
        <AccountStyle>
          <Avatar alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user?.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Role: {user?.role}
            </Typography>
            <FormControlLabel
              componentsProps={{
                typography: { variant: 'body2', color: 'primary.main' },
              }}
              sx={{ margin: 0 }}
              label="Switch role"
              labelPlacement="start"
              control={
                <Switch
                  checked={checked}
                  onChange={handleUserRoleChange}
                  name="user-role"
                />
              }
            />
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
    </Box>
  )
}
