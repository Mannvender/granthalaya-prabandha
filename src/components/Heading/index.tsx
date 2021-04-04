import React, { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const StyledHeading = styled.h1<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.color['accent-2']};
`
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  color?: string
  children: ReactNode
  // @fixme: allow as prop to styled components
  // as: string
}
const Heading = ({ children, ...props }: HeadingProps) => {
  return <StyledHeading {...props}>{children}</StyledHeading>
}

export default Heading
