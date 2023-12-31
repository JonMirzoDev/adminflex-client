/* eslint-disable react/prop-types */
export default function UserTable({
  users = [],
  handleCheck,
  styles,
  checkedUsers = {},
  isLoading = false
}) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Select</th>
          <th scope='col'>Name</th>
          <th scope='col'>e-Mail</th>
          <th scope='col'>Last login</th>
          <th scope='col'>Status</th>
        </tr>
      </thead>
      {isLoading ? (
        <div className='mt-3'>Loading...</div>
      ) : (
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id} onChange={() => handleCheck(user.id)}>
                <td className={styles.checkBox}>
                  <input type='checkbox' checked={!!checkedUsers[user.id]} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.lastLoginTime
                    ? new Date(user.lastLoginTime).toLocaleString()
                    : ''}
                </td>
                <td>{user.status}</td>
              </tr>
            ))}
        </tbody>
      )}
    </table>
  )
}
