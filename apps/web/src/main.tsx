import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import { RouterProvider } from 'react-router'
import { router } from './routes/index.ts'


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
