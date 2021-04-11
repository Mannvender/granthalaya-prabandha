import React, { HTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { MarginPaddingKeys } from 'types/margin-padding'

interface StyledProps extends HTMLAttributes<HTMLDivElement> {
  $height?: string
  bgColor?: string
  $justifyContent?: string
  $alignItems?: string
  $textAlign?: string
  $padding?: string | { [key in MarginPaddingKeys]?: string }
  $margin?: string | { [key in MarginPaddingKeys]?: string }
  $direction?: 'row' | 'column'
}
interface Props extends StyledProps {
  children?: ReactNode
}
const StyledDiv = styled.div<{
  $height: string
  bgColor: string
  $justifyContent: string
  $alignItems: string
  $padding?: string | { [key in MarginPaddingKeys]?: string }
  $margin?: string | { [key in MarginPaddingKeys]?: string }
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
  ${({ $margin, theme }) => {
    if (!$margin) return
    if (typeof $margin === 'string')
      return css`
        margin: ${theme.edgeSize[$margin] || $margin};
      `
    else if ($margin.horizontal || $margin.vertical) {
      const { horizontal, vertical } = $margin
      return css`
        margin: ${(theme.edgeSize[vertical || 'none'] || vertical) +
        ' ' +
        (theme.edgeSize[horizontal || 'none'] || horizontal)};
      `
    } else if ($margin.top || $margin.left || $margin.right || $margin.bottom) {
      const { top, right, bottom, left } = $margin
      return css`
        margin: ${(theme.edgeSize[top || 'none'] || top) +
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

const Box = ({
  $alignItems = '',
  bgColor = '',
  children,
  $justifyContent = '',
  $textAlign = 'left',
  $height = '',
  $direction = 'column',
  ...rest
}: Props) => {
  return (
    <StyledDiv
      $height={$height}
      bgColor={bgColor}
      $alignItems={$alignItems}
      $justifyContent={$justifyContent}
      $direction={$direction}
      $textAlign={$textAlign}
      {...rest}
    >
      {children}
    </StyledDiv>
  )
}

export default Box
