import { useState } from 'react'

interface UseEditReturn {
  loading: boolean
}

function useEdit() {
  const [loading, setLoading] = useState(false)
}

export default useEdit
