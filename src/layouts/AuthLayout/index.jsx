import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'

export default function AuthLayout() {
  return (
    <div className={styles.authLayout}>
      <h1 className={styles.welcomeText}>Welcome to AdminFlex</h1>
      <div className={styles.authCard}>
        <Outlet />
      </div>
    </div>
  )
}
