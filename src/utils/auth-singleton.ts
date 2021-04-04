interface AuthObject {
  token?: string | null
}
const auth: AuthObject = {}

function loadAuthToken() {
  const authToken: string | null = localStorage.getItem('current_auth_token')
  auth.token = authToken
  if (Boolean(authToken) === false) setTimeout(loadAuthToken, 200)
}

function setAuthToken(authToken: string) {
  localStorage.setItem('current_auth_token', authToken)
  auth.token = authToken
}

function getAuthToken() {
  return auth.token
}

function resetAuthToken() {
  localStorage.clear()
  auth.token = null
}

export { loadAuthToken, setAuthToken, getAuthToken, resetAuthToken }
