import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest/index'

const userService = {
  getUsers: async () => httpRequest.get('api/users'),
  deleteUser: async (id) => httpRequest.delete(`api/users/${id}`),
  updateStatus: async (data) =>
    httpRequest.patch(`api/users/${data.id}/status`, data.stat)
}

export const useGetUsers = (querySettings) => {
  return useQuery('users', userService.getUsers, {
    cacheTime: 0,
    ...querySettings
  })
}

export const useDeleteUser = (mutationSettings) => {
  return useMutation(userService.deleteUser, mutationSettings)
}

export const useUpdateStatus = (mutationSettings) => {
  return useMutation(userService.updateStatus, mutationSettings)
}
