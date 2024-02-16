import apiUrl from '../apiConfig'
import axios from 'axios'

// Read - index
export const getAllApplications = (bearerToken, userId) => {
  return axios.get(`${apiUrl}/applications?userId=${userId}`, {
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
export const createApplication = async (user, newApplication) => {
  try {
    // Add the owner ID to the new application
    const applicationWithOwner = {
      ...newApplication,
      ownerId: user._id // Assuming the user object contains the owner's ID
    };

    const response = await axios.post(`${apiUrl}/applications`, { application: applicationWithOwner }, {
      headers: {
        Authorization: `Token token=${user.token}`
      }
    });
    return response; // Return the complete response
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};
// Update - update an application
export const updateApplication = async (bearerToken, updatedApplication) => {
  return axios({
    url: `${apiUrl}/applications/${updatedApplication._id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    data: { application: updatedApplication }
  })
};

// Delete - delete an application
export const removeApplication = async (bearerToken, id, updatedData) => {
  try {
    await axios.delete(`${apiUrl}/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};
