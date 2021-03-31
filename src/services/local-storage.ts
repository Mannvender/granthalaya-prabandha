export function get_item (key: string){
  const localData = localStorage.getItem(key)
  return localData ? JSON.parse(localData): null
}

export function set_item (key: string, value: any){
  return localStorage.setItem(key, JSON.stringify(value))
}