import Iconify from '../../components/Iconify'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { UserState } from '../../types'
import { logoutUser } from '../../redux/actions'

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} width={22} height={22} />

const navConfig = [
  {
    title: 'library',
    perform: 'library',
    path: '/dashboard/books',
    icon: getIcon('raphael:books'),
  },
  {
    title: 'my books',
    perform: 'my_books',
    path: '/dashboard/my-books',
    icon: getIcon('bxs:book-reader'),
  },
  {
    title: 'authors',
    perform: 'authors',
    path: '/dashboard/authors',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'add author',
    perform: 'add_author',
    path: '/dashboard/add-author',
    icon: getIcon('fluent:people-add-16-filled'),
  },
  {
    title: 'add Book',
    perform: 'add_book',
    path: '/dashboard/add-book',
    icon: getIcon('ant-design:file-add-filled'),
  },
  {
    title: 'login',
    perform: 'login',
    path: '/dashboard/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'logout',
    perform: 'auth:logout',
    path: '/dashboard/logout',
    icon: getIcon('eva:log-out-fill'),
    performMethod: (dispatch: any) => {
      ;(dispatch as ThunkDispatch<UserState, void, Action>)(logoutUser())
    },
  },
]

export default navConfig
