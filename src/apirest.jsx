import axios from './axios'

export const BASE_URL = "http://localhost:5000"

const handleResponse = (response) => {
  const responseObj = {
    status: 500,
    success: false,
    error: null,
    data: null
  };

  if (response && response.status) {
    responseObj.status = response.status;
  } else if (response && response.response) {
    responseObj.status = response.response.status;
  }
  responseObj.success =
    responseObj.status === 200 || responseObj.status === 201;

  if (responseObj.status !== 200 && responseObj.status !== 201) {
    if (responseObj.status === 401) {
      responseObj.error = "Sin autorización"
    }
    if (response) {
      if (response.response) {
        responseObj.error = response.response.data;
      } else if (response.message) {
        responseObj.error = response.message;
      } else if (response.non_field_errors) {
        responseObj.error = response.non_field_errors[0];
      }
    }
  }

  responseObj.data =
    responseObj.status === 200 || responseObj.status === 201
      ? response.data || response.result
      : null;
  return responseObj;
};


export const get = async (resource, headers) => {
  const response = await axios
    .get(`${BASE_URL}/${resource}`, {headers})
    .then(handleResponse)
    .catch(handleResponse);
  return response;
};

export const post = async (resource, data, headers) => {
  const response = axios
    .post(`${BASE_URL}/${resource}`, data, {headers})
    .then(handleResponse)
    .catch(handleResponse);
  return response;
};

export const put = async (resource, data, headers) => {
  const response = await axios
    .put(`${BASE_URL}/${resource}`, data, {headers})
    .then(handleResponse)
    .catch(handleResponse);
  return response;
};

export const patch = async (resource, data, headers) => {
  const response = await axios
    .patch(`${BASE_URL}/${resource}`, data, {headers})
    .then(handleResponse)
    .catch(handleResponse);
  return response;
};

export const remove = async (resource, data, headers) => {
  const response = await axios
    .delete(`${BASE_URL}/${resource}`, data, {headers})
    .then(handleResponse)
    .catch(handleResponse);
  return response;
};