import { useDeleteUser, useGetUsers } from '../../services/user.service'
import {
  BsFillPersonXFill,
  BsFillPersonCheckFill,
  BsFillTrashFill
} from 'react-icons/bs'
import authStore from '../../store/auth.store'
import { useState } from 'react'
import styles from './style.module.scss'
import UserTable from './UserTable'
import { useQueryClient } from 'react-query'

export default function Users() {
  const { data: users, isLoading } = useGetUsers()
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser()
  const [checkedUsers, setCheckedUsers] = useState({})
  const store = authStore
  const queryClient = useQueryClient()

  const actionableUsers = Object.entries(checkedUsers)
    .filter(([_, isChecked]) => isChecked)
    .map(([userId]) => userId)

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

  const handleBulkDelete = () => {
    if (actionableUsers.length === 0) return

    actionableUsers.forEach((userId) => {
      deleteUser(userId, {
        onSuccess: () => {
          queryClient.invalidateQueries('users')
        },
        onError: (err) => {
          console.log('delete err: ', err)
        }
      })
    })
  }

  const handleLogout = () => {
    authStore.logout()
  }

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex align-items-center justify-content-end w-100 fs-4'>
          <span>Hello, {store?.userData?.name}!</span>
          <button className='btn btn-link fs-4' onClick={handleLogout}>
            Logout
          </button>
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
        <button
          className='btn btn-danger'
          onClick={handleBulkDelete}
          disabled={isDeleting}
        >
          <BsFillTrashFill /> Delete
        </button>
      </div>
      <UserTable
        users={users}
        handleCheck={handleCheck}
        styles={styles}
        checkedUsers={checkedUsers}
        isLoading={isLoading}
      />
    </div>
  )
}
