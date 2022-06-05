import { Link as RouterLink } from 'react-router-dom'
import { Box } from '@mui/material'

import LogoImage from '../../assets/images/closed_book_icon.svg'

export default function Logo({ disabledLink = false }) {
  const logo = (
    <Box component="img" src={LogoImage} sx={{ width: 40, height: 40 }} />
  )

  if (disabledLink) {
    return <>{logo}</>
  }

  return <RouterLink to="/">{logo}</RouterLink>
}
