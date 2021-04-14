import styled, { css } from 'styled-components'
import { MarginPaddingKeys } from 'types/margin-padding'

const StyledP = styled.p<{
  $color?: string
  $fontSize?: string
  $margin?: string | { [key in MarginPaddingKeys]?: string }
  $lineHeight?: string
}>`
  margin-top: 0;
  color: ${({ $color, theme }) => theme.color[$color || '#fff']};
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}
  ${({ $lineHeight }) =>
    $lineHeight &&
    css`
      line-height: ${$lineHeight};
    `}
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

export default StyledP
