// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Page404 from './pages/Page404'

// const AppRoutes = () => (
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="*" element={<Page404 />} />
//   </Routes>
// )

export default function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Navigate to="/dashboard/books" replace /> },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'books', element: <Home /> },
        { path: 'login', element: <Login /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: '/', element: <Navigate to="/dashboard/app" /> },
    //     { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    { path: '*', element: <Page404 /> },
  ])
}

// export default AppRoutes
