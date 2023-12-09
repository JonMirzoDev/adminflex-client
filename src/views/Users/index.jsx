import { useGetUsers } from '../../services/user.service'
import {
  BsFillPersonXFill,
  BsFillPersonCheckFill,
  BsFillTrashFill
} from 'react-icons/bs'
import authStore from '../../store/auth.store'
import { useState } from 'react'
import styles from './style.module.scss'
import UserTable from './UserTable'

export default function Users() {
  const { data: users, isLoading } = useGetUsers()
  const [checkedUsers, setCheckedUsers] = useState({})
  const store = authStore
  console.log('users: ', users)

  const handleCheck = (userId) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleBlock = (userId) => {
    console.log('Block user:', userId)
  }

  const handleUnblock = (userId) => {
    console.log('Unblock user:', userId)
  }

  const handleDelete = (userId) => {
    console.log('Delete user:', userId)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex align-items-center justify-content-end w-100 fs-4'>
          <span>Hello, {store?.userData?.name}!</span>
          <button className='btn btn-link fs-4'>Logout</button>
        </div>
      </div>
      <div className='mb-4 d-flex justify-content-start'>
        <button
          className='btn btn-secondary me-2'
          onClick={() => handleBlock()}
        >
          <BsFillPersonXFill /> Block
        </button>
        <button
          className='btn btn-success me-2'
          onClick={() => handleUnblock()}
        >
          <BsFillPersonCheckFill /> Unblock
        </button>
        <button className='btn btn-danger' onClick={() => handleDelete()}>
          <BsFillTrashFill /> Delete
        </button>
      </div>
      <UserTable
        users={users}
        handleCheck={handleCheck}
        styles={styles}
        checkedUsers={checkedUsers}
      />
    </div>
  )
}
