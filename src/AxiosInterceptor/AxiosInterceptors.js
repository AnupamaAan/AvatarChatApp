import axios from 'axios'

// const baseurl = process.env.REACT_APP_API_SAMPLE
const baseurl = process.env.REACT_APP_API_BASE_URL
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}
//console.log(localStorage.getItem('accesstoken'))
//console.log(localStorage.getItem('refreshtoken'))
const authToken = () => {
  const auth = localStorage.getItem('accesstoken')
  // console.log(auth, 'access token is')
  return auth
}

const refresh = () => {
  const refreshToken = localStorage.getItem('refreshtoken')
  return refreshToken
}
const storeToken = (newAccessToken) => {
  localStorage.setItem('accesstoken', newAccessToken)
}
// axios instance for making requests
const axiosInstance = axios.create(defaultOptions)

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  const accessToken = authToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'accesstoken',
    )}`
  } else {
    config.headers['Authorization'] = null
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response, dispatch) => {
    return response
    //   new Promise((resolve, reject) => {
    //   resolve(response);
    // })
  },

  (error) => {
    const originalRequest = error.config
    if (!error.response) {
      return new Promise((resolve, reject) => {
        // reject(error);
      })
    }
    // if (error) {
    if (
      error.response.status === 401 &&
      error.response.data['code'] === 'token_not_valid' &&
      !originalRequest._retry &&
      error.response.config.url !== baseurl + '/token/refresh/'
    ) {
      // alert('hi')
      // console.log(localStorage.getItem('accesstoken'), 'access token')
      const refreshToken = refresh()
      originalRequest._retry = true
      return axiosInstance
        .post(baseurl + `/token/refresh/`, {
          refresh: refreshToken,
        })
        .then(async (res) => {
          // console.log(res)
          const access_token = res.data['access']
          storeToken(access_token)
          const auth = access_token
          originalRequest.headers.Authorization = `Bearer ${auth}`
          return axiosInstance(originalRequest)
        })
        .catch((err) => {
          console.log(err)
          // sessionStorage.setItem('error', err)
          // localStorage.removeItem('accesstoken')
          // localStorage.removeItem('refreshtoken')
          // window.location = '/'
          return Promise.reject()
        })
    } else {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
    // }
  },
)

export default axiosInstance
