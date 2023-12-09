import {
  useDeleteUser,
  useGetUsers,
  useUpdateStatus
} from '../../services/user.service'
import authStore from '../../store/auth.store'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import UserTable from './UserTable'
import { useQueryClient } from 'react-query'
import UserActions from './UserActions'

export default function Users() {
  const { data: users, isLoading } = useGetUsers()
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser()
  const { mutate: updateUserStatus, isLoading: isUpdating } = useUpdateStatus()
  const [checkedUsers, setCheckedUsers] = useState({})
  const store = authStore
  const queryClient = useQueryClient()
  const [isActionDisabled, setIsActionDisabled] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const isAllBlocked = users?.every((u) => u.status === 'blocked')
      if (isAllBlocked) {
        authStore.logout()
      }
    }
    const currentUser = users?.find((u) => u.email === store?.userData?.email)
    if (currentUser?.status === 'blocked') {
      setIsActionDisabled(true)
    } else {
      setIsActionDisabled(false)
    }
  }, [users, store?.userData, isLoading])

  const actionableUsers = Object.entries(checkedUsers)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, isChecked]) => isChecked)
    .map(([userId]) => userId)

  const handleCheck = (userId) => {
    setCheckedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const updateStatus = (userStatus) => {
    if (actionableUsers.length === 0) return

    actionableUsers.forEach((userId) => {
      updateUserStatus(
        { id: userId, stat: { status: userStatus } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('users')
            setCheckedUsers({})
          },
          onError: (err) => {
            console.log('updateStatus err: ', err)
          }
        }
      )
    })
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
      <UserActions
        updateStatus={updateStatus}
        isActionDisabled={isActionDisabled}
        isUpdating={isUpdating}
        handleBulkDelete={handleBulkDelete}
        isDeleting={isDeleting}
      />
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
