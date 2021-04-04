import * as React from 'react'
import styled, { css } from 'styled-components'

// @todo: fix shape of padding object
type PaddingKeys =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'horizontal'
  | 'vertical'
const StyledDiv = styled.div<{
  $height: string
  bgColor: string
  $justifyContent: string
  $alignItems: string
  $padding?: string | { [key in PaddingKeys]?: string }
  $direction?: 'row' | 'column'
  $textAlign: string
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  text-align: ${({ $textAlign }) => $textAlign};
  height: ${({ theme, $height }) => theme.size[$height] || $height};
  background-color: ${({ theme, bgColor }) => theme.color[bgColor] || bgColor};
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `}
  ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `}
  ${({ $padding, theme }) => {
    if (!$padding) return
    if (typeof $padding === 'string')
      return css`
        padding: ${theme.edgeSize[$padding] || $padding};
      `
    else if ($padding.horizontal || $padding.vertical) {
      const { horizontal, vertical } = $padding
      return css`
        padding: ${(theme.edgeSize[vertical || 'none'] || vertical) +
        ' ' +
        (theme.edgeSize[horizontal || 'none'] || horizontal)};
      `
    } else if (
      $padding.top ||
      $padding.left ||
      $padding.right ||
      $padding.bottom
    ) {
      const { top, right, bottom, left } = $padding
      return css`
        padding: ${(theme.edgeSize[top || 'none'] || top) +
        ' ' +
        (theme.edgeSize[right || 'none'] || right) +
        ' ' +
        (theme.edgeSize[bottom || 'none'] || bottom) +
        ' ' +
        (theme.edgeSize[left || 'none'] || left)};
      `
    }
  }}
`

interface Props {
  height?: string
  bgColor?: string
  children?: any
  justifyContent?: string
  alignItems?: string
  textAlign?: string
  padding?: string | { [key in PaddingKeys]?: string }
  direction?: 'row' | 'column'
}
const Box = ({
  alignItems = '',
  bgColor = '',
  children,
  justifyContent = '',
  textAlign = 'left',
  height = '',
  padding,
  direction = 'column',
  ...rest
}: Props) => {
  return (
    <StyledDiv
      $height={height}
      bgColor={bgColor}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $padding={padding}
      $direction={direction}
      $textAlign={textAlign}
      {...rest}
    >
      {children}
    </StyledDiv>
  )
}

export default Box
