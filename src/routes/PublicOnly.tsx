import React from 'react'
import { Route } from 'react-router-dom'

import { getAuthToken } from 'utils/auth-singleton'
import StackLayout from 'layouts/Stack'

interface Props {
  component?: any
}
const PublicOnlyRoute = ({ component: Component, ...rest }: Props) => {
  const authToken = getAuthToken()
  if (authToken) {
    //TODO: if authToken is there then redirect according to business logic
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

export default PublicOnlyRoute
