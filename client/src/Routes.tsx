import { Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Authors from './pages/Authors'
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
      ],
    },
    { path: '*', element: <Page404 /> },
  ])
}
