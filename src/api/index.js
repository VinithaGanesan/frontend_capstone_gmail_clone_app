import axios from 'axios';


const url = 'https://backend-capstone-gmail-clone-app.onrender.com'


const headers = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        token : token,
    }
});


// account routes
export const register = (form) => axios.post(`${url}/auth/create`, form);
export const login = (form) => axios.post(`${url}/auth/signin`, form);


// email routes
export const sendEmail = (form) => axios.post(`${url}/save`, form);
export const savedraftEmail = (form) => axios.post(`${url}/savedraft`, form);
export const getAllEmails = (token,type) => axios.get(`${url}/emails/${type}`, headers(token));
export const searchAllEmails = (token) => axios.get(`${url}/search`, headers(token));
export const toggleStarredEmails = ({id, value}) => axios.post(`${url}/starred`, {id, value});
export const moveEmailsToBin = (selectedEmails) => axios.post(`${url}/bin`, selectedEmails);
export const deleteEmails = (selectedEmails) => axios.delete(`${url}/delete`, {
  data: selectedEmails
});















// export async function client(endpoint, { body, ...customConfig } = {}) {
//     const headers = { 'Content-Type': 'application/json' }
  
//     const config = {
//       method: body ? 'POST' : 'GET',
//       ...customConfig,
//       headers: {
//         ...headers,
//         ...customConfig.headers,
//       },
//     }
  
//     if (body) {
//       config.body = JSON.stringify(body)
//     }
  
//     let data
//     try {
//       const response = await window.fetch(endpoint, config)
//       data = await response.json()
//       if (response.ok) {
//         // Return a result object similar to Axios
//         return {
//           status: response.status,
//           data,
//           headers: response.headers,
//           url: response.url,
//         }
//       }
//       throw new Error(response.statusText)
//     } catch (err) {
//       return Promise.reject(err.message ? err.message : data)
//     }
//   }
  
//   client.get = function (endpoint, customConfig = {}) {
//     return client(endpoint, { ...customConfig, method: 'GET' })
//   }
  
//   client.post = function (endpoint, body, customConfig = {}) {
//     return client(endpoint, { ...customConfig, body })
//   }
  