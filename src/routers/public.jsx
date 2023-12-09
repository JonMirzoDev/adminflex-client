import { useRoutes } from 'react-router-dom'
import LandingPage from '../views/LandingPage'

export const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />
  }
]

const PublicRoutes = () => {
  let element = useRoutes(publicRoutes)
  return element
}

export default PublicRoutes
