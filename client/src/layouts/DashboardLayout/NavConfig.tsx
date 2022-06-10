import Iconify from '../../components/Iconify'

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} width={22} height={22} />

const navConfig = [
  {
    title: 'library',
    path: '/dashboard/books',
    icon: getIcon('raphael:books'),
  },
  {
    title: 'authors',
    path: '/dashboard/authors',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'add Author',
    path: '/dashboard/add-author',
    icon: getIcon('fluent:people-add-16-filled'),
  },
  {
    title: 'login',
    path: '/dashboard/login',
    icon: getIcon('eva:lock-fill'),
  },
]

export default navConfig
