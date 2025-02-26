import axios from 'axios';
import {BaseUrl, Endpoints, Token} from './Config';

export const sendOtp = async phone => {
  try {
    const response = await axios.post(
      `${BaseUrl}${Endpoints.sendOtp}`,
      {phone},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};
export const verifyOtp = async (phone, otp) => {
  try {
    const response = await axios.post(
      `${BaseUrl}${Endpoints.verifyOtp}`,
      {phone, otp},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error.response?.data || error.message;
  }
};
export const uploadImage = async (imageData, routeName, token) => {
  console.log('Route Name:', routeName);
  console.log('Image Data:', imageData);

  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });
    formData.append('name', routeName);

    console.log('Form Data:', formData);

    const apiUrl = `${BaseUrl}${Endpoints.createprofile}`;
    console.log('API URL:', apiUrl);

    console.log('Authorization Token:', token);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);

    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      console.error('Request Details:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }

    throw error.response?.data || error.message;
  }
};
export const fetchSubscriptionPlans = async () => {
  try {
    const response = await axios.get(`${BaseUrl}${Endpoints.getallplan}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
};
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${BaseUrl}${Endpoints.getuserdata}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const sendLocation = async (latitude, longitude) => {
  try {
    const data = JSON.stringify({ latitude, longitude });
    const response = await axios.post(
      `${BaseUrl}${Endpoints.sendUserlocation}`,
      data,
      {
        headers: {
          Authorization: Token,
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending location:', error);
    throw error;
  }
};
export const fetchUserGroup = async (token) => {
  try {
    const response = await axios.get(`${BaseUrl}${Endpoints.getusergroup}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
export const sendGroupInvitation = async (groupData) => {
  try {
    const response = await axios.post(
      `${BaseUrl}${Endpoints.creategroup}`, 
      groupData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};
export const fetchuserinvetation = async () => {
  try {
    const response = await axios.get(`${BaseUrl}${Endpoints.prndinginvite}`, {
      headers: {
        Authorization: Token,
      },
    });
    return response.data; 
  } catch (error) {
    console.log("error",JSON.stringify(error));
    throw error;
  }
};
export const acceptGroupInvitation = async (groupId) => {
  try {
    const response = await axios.post(
      `${BaseUrl}${Endpoints.acceptinvite}`,
      { group_id: groupId },
      {
        headers: {
          'Authorization': Token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error accepting group invitation:', error);
    throw error;
  }
};
export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${BaseUrl}${Endpoints.deletegroup}`, {
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json',
      },
      data: { group_id: groupId },
    });
    return response.data;
  } catch (error) {
    console.log('Error deleting group:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unexpected error occurred.' };
  }
};
export const deleteGroupMember = async (groupId,userId) => {
  try {
    const response = await axios.delete(`${BaseUrl}${Endpoints.deletemember}`, {
      headers: {
        Authorization: Token,
        'Content-Type': 'application/json',
      },
      data: {
        group_id: groupId,
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("errorodkhsjdhfjsa",JSON.stringify(error));
    console.error('Error deleting group member:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unexpected error occurred.' };
  }
};
export const getUserLocation = async (memberUserId, groupId, token) => {
  try {
    // Correcting the URL by removing the extra slash
    const url = `https://stayconnected.virtualspheretechnologies.in/api/getMember-location`;

    const params = {
      memberUserId: memberUserId,
      group_id: groupId
    };

    console.log('Making request to:', url);

    // Pass params as query parameters
    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      data: params  // This will send the params as query parameters
    });

    return response.data;
  } catch (error) {
    console.log("Full error:", JSON.stringify({
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      headers: error.response?.headers
    }, null, 2));
    throw error;
  }
};


export const fetchMemberLocation = async (memberUserId, groupId) => {
  try {
    const response = await axios.post(
      `${BaseUrl}${Endpoints.getmemberlocation}`,
      { memberUserId, group_id: groupId },
      {
        headers: {
          Authorization:Token ,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.location || null;
  } catch (error) {
    console.error('Error fetching member location:', error);
    throw error;
  }
};
