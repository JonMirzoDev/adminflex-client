/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  BsFillPersonXFill,
  BsFillPersonCheckFill,
  BsFillTrashFill
} from 'react-icons/bs'

export default function UserActions({
  updateStatus,
  isActionDisabled = false,
  isUpdating = false,
  handleBulkDelete,
  isDeleting
}) {
  const [status, setStatus] = useState('')
  return (
    <div className='mb-4 d-flex justify-content-start'>
      <button
        className='btn btn-secondary me-2'
        onClick={() => {
          setStatus('blocked')
          updateStatus('blocked')
        }}
        disabled={isActionDisabled || (isUpdating && status === 'blocked')}
      >
        <BsFillPersonXFill /> Block
      </button>
      <button
        className='btn btn-success me-2'
        disabled={isActionDisabled || (isUpdating && status === 'active')}
        onClick={() => {
          setStatus('active')
          updateStatus('active')
        }}
      >
        <BsFillPersonCheckFill /> Unblock
      </button>
      <button
        className='btn btn-danger'
        onClick={handleBulkDelete}
        disabled={isActionDisabled || isDeleting}
      >
        <BsFillTrashFill /> Delete
      </button>
    </div>
  )
}
