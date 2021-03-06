import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import Iconify from '../Iconify'
import Can from '../../Can'

// ----------------------------------------------------------------------

export type MoreMenuPropType = {
  onDeleteBtnClick?: () => void
  route: string
}

export default function MoreMenu({
  onDeleteBtnClick,
  route,
}: MoreMenuPropType) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Can
      perform={
        'books:update' && 'books:delete' && 'authors:update' && 'authors:delete'
      }
      yes={() => (
        <>
          <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
          </IconButton>

          <Menu
            open={isOpen}
            anchorEl={ref.current}
            onClose={() => setIsOpen(false)}
            PaperProps={{
              sx: { width: 200, maxWidth: '100%' },
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              sx={{ color: 'text.secondary' }}
              onClick={onDeleteBtnClick}
            >
              <ListItemIcon>
                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Delete"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>

            <MenuItem
              component={RouterLink}
              to={route}
              sx={{ color: 'text.secondary' }}
            >
              <ListItemIcon>
                <Iconify icon="eva:edit-fill" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Edit"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          </Menu>
        </>
      )}
      no={() => <></>}
    ></Can>
  )
}
