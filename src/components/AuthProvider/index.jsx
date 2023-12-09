import { observer } from 'mobx-react-lite'
import PrivateRoutes from '../../routers/private'
import PublicRoutes from '../../routers/public'
import authStore from '../../store/auth.store'

const AuthProvider = () => {
  const { isAuth } = authStore

  return isAuth ? <PrivateRoutes /> : <PublicRoutes />
}

export default observer(AuthProvider)
