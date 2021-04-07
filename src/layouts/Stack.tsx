// lib imports
import React from 'react'

// shared imports
import Box from 'components/Box'
import Navbar from 'components/Navbar'

interface Props {
  children?: any
  title?: string
}
const StackLayout = ({ children }: Props) => {
  return (
    <Box $height="100%" bgColor="primary" style={{ minHeight: '100vh' }}>
      <Navbar />
      {children}
    </Box>
  )
}

export default StackLayout
