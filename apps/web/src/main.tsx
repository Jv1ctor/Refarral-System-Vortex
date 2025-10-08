import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import { RouterProvider } from 'react-router'
import React from 'react'
import { router } from './routes'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
