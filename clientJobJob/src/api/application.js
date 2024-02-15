import apiUrl from '../apiConfig'
import axios from 'axios'

// Read - index
export const getAllApplications = (bearerToken) => {
  return axios.get(`${apiUrl}/applications`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
}
// Read - show
export const getOneApplication = (bearerToken, id) => {
  return axios(`${apiUrl}/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  })
}
// Create - add an application
// Update - update an application
// Delete - delete an application