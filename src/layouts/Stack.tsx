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
    <Box height="100%" bgColor="primary" margin="medium">
      {children}
    </Box>
  )
}

export default StackLayout
