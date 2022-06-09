import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material'

import Iconify from '../Iconify'
import { setAuthorsFilterValue } from '../../redux/actions'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  padding: theme.spacing(3, 0, 3, 0),
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[400]} !important`,
  },
}))

// ----------------------------------------------------------------------

export default function AuthorsToolbar() {
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')

  function handleInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchValue(event.target.value)
    dispatch(setAuthorsFilterValue(event.target.value))
  }

  return (
    <RootStyle>
      <SearchStyle
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search authors by name..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </RootStyle>
  )
}
