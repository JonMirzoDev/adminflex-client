import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const userService = {
  getUsers: async () => httpRequest.get('api/users'),
  deleteUser: async (id) => httpRequest.delete(`api/users/${id}`)
}

export const useGetUsers = (querySettings) => {
  return useQuery('users', userService.getUsers, querySettings)
}

export const useDeleteUser = (mutationSettings) => {
  return useMutation(userService.deleteUser, mutationSettings)
}
