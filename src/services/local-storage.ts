export function getItem(key: string) {
  const localData = localStorage.getItem(key)
  return localData ? JSON.parse(localData) : null
}

export function setItem(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value))
}
