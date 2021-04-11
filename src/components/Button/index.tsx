import React, { HTMLAttributes, ReactNode, ComponentType } from 'react'
import styled, { css } from 'styled-components'

import { MarginPaddingKeys } from 'types/margin-padding'

// @fixme: prop "type" should be allowed by HTMLButtonElement
interface StyledProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Should show shadow
   */
  hasShadow?: boolean
  /**
   * What text color to use? This will override the default color
   */
  color?: string
  /**
   * What background color to use? This will override the default background color
   */
  backgroundColor?: string
  /**
   * What shadow color to use? This will override the default shadow color
   */
  shadowColor?: string
  /**
   * How large should the button be?
   */
  size?: 'medium' | 'largish' | 'large'
  /**
   * HTML attribute "type"
   */
  type?: 'submit' | 'button'
  /**
   * What margin to use ? This will add margin
   */
  $margin?: string | { [key in MarginPaddingKeys]?: string }
  /**
   * What html element to use as container
   */
  as?: string | ComponentType<any>
}
export interface ButtonProps extends StyledProps {
  /**
   * Button contents
   */
  children: ReactNode
}

const StyledButton = styled.button<StyledProps>`
  font-family: inherit;
  outline: none;
  padding: 3px 20px 3px 20px;
  border: 0;
  border-radius: 14px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  transition: transform translate 150ms;
  color: ${({ theme, color }) => theme.color[color!] || color};
  background-color: ${({ theme, backgroundColor }) =>
    theme.color[backgroundColor!] || backgroundColor};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    box-shadow: 0 0;
    transform: translateY(5px);
  }

  ${({ size }) => {
    return (
      size === 'large' &&
      css`
        padding: 6px 32px 6px 32px;
        border-radius: 22.5px;
        line-height: 28px;
        font-size: 20px;
      `
    )
  }}

  ${({ size }) => {
    return (
      size === 'largish' &&
      css`
        font-size: 16px;
        line-height: 24px;
        border-radius: 18px;
        padding: 4px 24px 4px 24px;
      `
    )
  }}

  ${({ hasShadow, shadowColor, theme }) => {
    return (
      hasShadow &&
      css`
        box-shadow: 0 6px ${theme.color[shadowColor!] || shadowColor};
      `
    )
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

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  backgroundColor = 'accent-2',
  shadowColor = 'accent-3',
  color = '#fff',
  hasShadow = true,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      shadowColor={shadowColor}
      type={type}
      size={size}
      hasShadow={hasShadow}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
