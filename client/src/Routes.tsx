import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import MyBooks from './pages/MyBooks'
import Authors from './pages/Authors'
import AddAuthor from './pages/AddAuthor'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
import UpdateAuthor from './pages/UpdateAuthor'
import Login from './pages/Login'
import Page404 from './pages/Page404'
import Can from './Can'

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/dashboard/books" replace /> },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'books', element: <Home /> },
        { path: 'my-books', element: <MyBooks /> },
        { path: 'login', element: <Login /> },
        { path: 'authors', element: <Authors /> },
        {
          path: 'add-author',
          element: (
            <Can
              perform="add_author"
              yes={() => <AddAuthor />}
              no={() => <Navigate to="/dashboard/books" replace />}
            />
          ),
        },
        {
          path: 'add-book',
          element: (
            <Can
              perform="add_book"
              yes={() => <AddBook />}
              no={() => <Navigate to="/dashboard/books" replace />}
            />
          ),
        },
        {
          path: 'updateBook/:_id',
          element: (
            <Can
              perform="update_book"
              yes={() => <UpdateBook />}
              no={() => <Navigate to="/dashboard/books" replace />}
            />
          ),
        },
        {
          path: 'updateAuthor/:_id',
          element: (
            <Can
              perform="update_author"
              yes={() => <UpdateAuthor />}
              no={() => <Navigate to="/dashboard/books" replace />}
            />
          ),
        },
        { path: 'logout', element: <Navigate to="/" replace /> },
      ],
    },
    { path: '*', element: <Page404 /> },
  ])
}
