import type { AxiosInstance } from 'axios'
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_URL
const autopay = import.meta.env.VITE_APP_AUTOPAYMENT_POSTFIX
const cash = import.meta.env.VITE_APP_CASH_POSTFIX
const jsonplaceholder = import.meta.env.VITE_APP_JSONPLACEHOLDER

axios.defaults.headers.common['Content-Type'] = 'application/json'

type AxiosInstanceType =
  | 'cashAPI'
  | 'autopayAPI'
  | 'usersAPI'

type AxiosCollection = Record<AxiosInstanceType, AxiosInstance>

const http: AxiosCollection = {
  cashAPI: axios.create({ baseURL: `${baseURL}${cash}/api` }),
  autopayAPI: axios.create({ baseURL: `${baseURL}${autopay}/api` }),
  usersAPI: axios.create({ baseURL: `${jsonplaceholder}` }),
}
// for auth
/* Object.values(http).forEach((value: AxiosInstance) => {
  value.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`
    return config
  })

  value.interceptors.response.use(
    conf => conf,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken')
        location.reload()
      }
      return Promise.reject(error)
    },
  )
}) */

export default http
