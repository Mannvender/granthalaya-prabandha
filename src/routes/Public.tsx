import React from 'react'
import { Route } from 'react-router-dom'

import { getAuthToken } from 'utils/auth-singleton'
import { StackLayout } from 'layouts'

interface Props {
  component?: any
}
const PublicRoute = ({ component: Component, ...rest }: Props) => {
  const authToken = getAuthToken()
  if (authToken) {
    // Call getProfile async, so that we can display profile in Header
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <StackLayout>
            <Component {...props} />
          </StackLayout>
        )
      }}
    />
  )
}

export default PublicRoute
