export const getstorage = (key,def) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : def
}
export const setstorage = (key,obj) => {
  localStorage.setItem(key,JSON.stringify(obj))
}
export const rmstorage = (key) => {
  localStorage.removeItem(key)
}