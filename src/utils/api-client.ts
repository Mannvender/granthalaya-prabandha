import axios from 'axios'
import { getAuthToken, loadAuthToken } from 'utils/auth-singleton'

/**
 * NOTES:-
 *  - API client return axios instance.
 *  - we can call axios methods on this instance.
 *  - additional standard headers & configs can be passed
 *    to create this instance.
 */
export default (headers: Record<string, any>, ...config: Array<any>) => {
  // TODO: move it to its place
  loadAuthToken()

  let defaultHeaders: { [key: string]: any } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const authToken = getAuthToken()
  if (authToken) {
    defaultHeaders['Authorization'] = `${authToken}`
  }
  // TODO :- in case of timeout, use interceptor to throw error format - its crashing
  // TODO :- request cancellation support on unmount
  let defaultConfig = {
    timeout: 5000,
  }
  if (headers) {
    defaultHeaders = { ...defaultHeaders, ...headers }
  }
  if (headers) {
    defaultConfig = { ...defaultConfig, ...config }
  }
  return axios.create({
    baseURL: process.env.REACT_APP_CURRENT_API_BASE_URL,
    headers: defaultHeaders,
    ...defaultConfig,
  })
}
