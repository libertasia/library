import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Authors from './pages/Authors'
import AddAuthor from './pages/AddAuthor'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
import UpdateAuthor from './pages/UpdateAuthor'
import Login from './pages/Login'
import Page404 from './pages/Page404'

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/dashboard/books" replace /> },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'books', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'authors', element: <Authors /> },
        { path: 'add-author', element: <AddAuthor /> },
        { path: 'add-book', element: <AddBook /> },
        { path: 'updateBook/:_id', element: <UpdateBook /> },
        { path: 'updateAuthor/:_id', element: <UpdateAuthor /> },
      ],
    },
    { path: '*', element: <Page404 /> },
  ])
}
