import React, { useState } from 'react'

import Box from 'components/Box'
import Webcam from 'components/Webcam'
import useSearchFaces from 'hooks/useSearchFaces'

const Login = () => {
  const [base64Image, setImage] = useState<string>('')
  const { isFetching, isSuccess, error } = useSearchFaces({ base64Image })
  // eslint-disable-next-line no-console
  console.log(
    isFetching,
    isSuccess,
    error,
    '------isFetching, isSuccess, error-----',
  )

  const handleCapture = (base64Image: string) => setImage(base64Image)

  return (
    <Box alignItems="center">
      <Webcam onCapture={handleCapture} />
    </Box>
  )
}

export default Login
