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
`
const Navbar = () => {
  return (
    <StyledHeader>
      <StyledLink to="/register">Register</StyledLink>
      <StyledLink to="/login">Login</StyledLink>
    </StyledHeader>
  )
}

export default Navbar
