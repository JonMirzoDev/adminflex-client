import { Navigate, useRoutes } from 'react-router-dom'
import Users from '../views/Users'

export const privateRoutes = [
  {
    path: '/users',
    element: <Users />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
