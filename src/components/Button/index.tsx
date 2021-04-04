import React, { HTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'

// @fixme: prop "type" should be allowed by HTMLButtonElement
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
   * Button contents
   */
  children: ReactNode
  /**
   * HTML attribute "type"
   */
  type?: 'submit' | 'button'
}

const StyledButton = styled.button`
  outline: none;
  padding: 3px 20px 3px 20px;
  border: 0;
  border-radius: 14px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  transition: transform translate 150ms;
  color: ${(props: ButtonProps) => props.color};
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

  ${(props: ButtonProps) => {
    return (
      props.size === 'large' &&
      css`
        padding: 6px 32px 6px 32px;
        border-radius: 22.5px;
        line-height: 28px;
        font-size: 20px;
      `
    )
  }}

  ${(props: ButtonProps) => {
    return (
      props.size === 'largish' &&
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
        box-shadow: 0 8px ${theme.color[shadowColor!] || shadowColor};
      `
    )
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
