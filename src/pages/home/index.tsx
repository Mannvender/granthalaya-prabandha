import React from 'react'

import Box from 'components/Box'
import Webcam from 'components/Webcam'

const Home = () => {
  const handleCapture = (base64Image: string) => {
    // eslint-disable-next-line no-console
    console.log(base64Image)
  }

  return (
    <Box alignItems="center">
      <Webcam onCapture={handleCapture} />
    </Box>
  )
}

export default Home
