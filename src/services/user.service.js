import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const userService = {
  getUsers: async () => httpRequest.get('api/users')
}

export const useGetUsers = (querySettings) => {
  return useQuery('users', userService.getUsers, querySettings)
}
