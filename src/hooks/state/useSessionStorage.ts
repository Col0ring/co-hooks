import createStorageState from './createStorageState'

const useSessionStorage = createStorageState(sessionStorage)

export default useSessionStorage
