import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.size.medium};
  background-color: #383863;
  padding: ${({ theme }) => theme.edgeSize.small};
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 3px 0px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  margin: 0 8px;
  &:active {
    color: ${({ theme }) => theme.color['accent-2']};
  }
`
const Navbar = () => {
  return (
    <StyledHeader>
      <StyledLink to="/register">Register</StyledLink>
      <StyledLink to="/punch-in">Punch-in</StyledLink>
      <StyledLink to="/punch-out">Punch-out</StyledLink>
      <StyledLink to="/list">List</StyledLink>
    </StyledHeader>
  )
}

export default Navbar
