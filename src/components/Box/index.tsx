import * as React from "react"
import styled, { css } from "styled-components"

const StyledDiv = styled.div<{
  height: string
  bgColor: string
  justifyContent: string
  alignItems: string
}>`
  display: flex;
  flex-direction: column;
  height: ${({ theme, height }) => theme.size[height] || height};
  background-color: ${({ theme, bgColor }) => theme.color[bgColor] || bgColor};
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
  ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `}
`

interface Props {
  height?: string
  bgColor?: string
  children?: any
  justifyContent?: string
  alignItems?: string
}
const Box = ({
  alignItems = "",
  bgColor = "",
  children,
  justifyContent = "",
  height = "",
  ...rest
}: Props) => {
  return (
    <StyledDiv
      height={height}
      bgColor={bgColor}
      alignItems={alignItems}
      justifyContent={justifyContent}
      {...rest}
    >
      {children}
    </StyledDiv>
  )
}

export default Box
