import axios from 'axios';


const url = 'http://localhost:5000'

const headers = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
        token : token,
    }
});



// account routes
export const register = (form) => axios.post(`${url}/auth/create`, form);
export const login = (form) => axios.post(`${url}/auth/signin`, form);


// email routes
// export const getAllEmails = (token) => axios.get(`${url}/email`, headers(token))
export const sendEmail = (form) => axios.post(`${url}/save`, form);
export const getAllEmails = (token,type) => axios.get(`${url}/emails/${type}`, headers(token))
















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
  