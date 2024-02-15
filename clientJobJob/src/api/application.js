import apiUrl from '../apiConfig'
import axios from 'axios'

// Read - index
export const getAllApplications = (bearerToken) => {
  return axios.get(`${apiUrl}/applications`, {
      headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
      }
  });
}
// Read - show
// Create - add an application
// Update - update an application
// Delete - delete an application