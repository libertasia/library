import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material'

import Iconify from '../Iconify'
import {
  setSearchValue,
  setSearchType,
  setStatusFilters,
} from '../../redux/actions'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  padding: theme.spacing(3, 1, 3, 3),
}))

const SelectStyle = styled(TextField)(({ theme }) => ({
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[400]} !important`,
  },
  '& .MuiFormHelperText-root': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  margin: theme.spacing(0, 1, 0, 0),
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

const searchSelectValues = [
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'isbn',
    label: 'ISBN',
  },
  {
    value: 'author',
    label: 'Author',
  },
]

export default function BooksTableToolbar() {
  const dispatch = useDispatch()

  const [searchType, setSearchTypeState] = useState('title')
  const [searchValue, setSearchValueState] = useState('')
  const statusesInitialState: { [key: string]: boolean } = {
    AVAILABLE: false,
    BORROWED: false,
  }
  const [filterStatuses, setFilterStatuses] = useState(statusesInitialState)
  const { AVAILABLE, BORROWED } = filterStatuses

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchType(event.target.value))
    setSearchTypeState(event.target.value)
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    dispatch(setSearchValue(event.target.value))
    setSearchValueState(event.target.value)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatusState = {
      ...filterStatuses,
      [event.target.name]: event.target.checked,
    }
    setFilterStatuses(newStatusState)
    const statuses = Object.keys(newStatusState).filter(
      (status) => newStatusState[status]
    )
    dispatch(setStatusFilters(statuses))
  }

  return (
    <RootStyle
    // sx={{
    //   color: 'primary.main',
    //   bgcolor: 'primary.lighter',
    // }}
    >
      {/* {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : ( */}

      <SelectStyle
        id="select-search-by"
        select
        label="Search by"
        value={searchType}
        onChange={handleSelectChange}
        helperText="Please select search option"
      >
        {searchSelectValues.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectStyle>

      <SearchStyle
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search books..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />

      <Box sx={{ display: 'flex', width: '100%' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Status</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={AVAILABLE}
                  onChange={handleStatusChange}
                  name="AVAILABLE"
                />
              }
              label="Available"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={BORROWED}
                  onChange={handleStatusChange}
                  name="BORROWED"
                />
              }
              label="Borrowed"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </RootStyle>
  )
}
