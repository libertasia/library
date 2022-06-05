import { Icon } from '@iconify/react'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

export type IconifyPropType = {
  icon: string
  sx?: {}
  [x: string]: any
}

export default function Iconify({ icon, sx, ...other }: IconifyPropType) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
