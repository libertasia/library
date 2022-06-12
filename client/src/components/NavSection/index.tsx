import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'
import { alpha, useTheme, styled } from '@mui/material/styles'
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material'

import Iconify from '../Iconify'
import Can from '../../Can'

// ----------------------------------------------------------------------

const ListItemStyle = styled((props: any) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}))

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

// ----------------------------------------------------------------------

export type NavItemPropType = {
  item: {
    title: string
    perform: string
    performMethod: any
    path: string
    icon: string
    info: string
    children?: any
  }
  active: (path: string) => boolean
}

function NavItem({ item, active }: NavItemPropType) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const isActiveRoot = active(item.path)

  const { title, path, icon, info, children } = item

  const [open, setOpen] = useState(isActiveRoot)

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  }

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  }

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? 'eva:arrow-ios-downward-fill'
                : 'eva:arrow-ios-forward-fill'
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: any) => {
              const { title, path, perform } = item
              const isLink = perform.indexOf(':') === -1
              const isActiveSub = active(path)

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={isLink ? path : '#'}
                  onClick={isLink ? null : () => console.log(`clicked`)}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) =>
                          theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }

  const { perform, performMethod } = item
  const isLink = perform.indexOf(':') === -1

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      onClick={
        isLink
          ? undefined
          : () => {
            performMethod(dispatch)
          }
      }
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  )
}

export type NavSectionPropType = {
  navConfig: any[]
  [x: string]: any
}
export default function NavSection({
  navConfig,
  ...other
}: NavSectionPropType) {
  const { pathname } = useLocation()

  const match = (path: any) =>
    path ? !!matchPath({ path, end: false }, pathname) : false

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => {
          return (
            <Can
              key={item.title}
              perform={item.perform}
              yes={() => <NavItem item={item} active={match} />}
              no={() => <></>}
            ></Can>
          )
        })}
      </List>
    </Box>
  )
}
