// lib imports
import React from 'react'

// shared imports
import Box from 'components/Box'

interface Props {
  children?: any
  title?: string
}
const StackLayout = ({ children }: Props) => {
  return (
    <Box
      $height="100%"
      bgColor="primary"
      $padding="medium"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </Box>
  )
}

export default StackLayout
