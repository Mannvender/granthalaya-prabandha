// library imports
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Rekognition } from '@aws-sdk/client-rekognition'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'

import theme from 'theme'
import routes from 'routes'
import PublicRoute from 'routes/Public'
import PublicOnlyRoute from 'routes/PublicOnly'
import PrivateRoute from 'routes/Private'

import ErrorBoundry from 'components/ErrorBoundry'
const { REACT_APP_AWS_REGION, REACT_APP_AWS_IDENTITY_POOL_ID } = process.env

const cognitoIdentityClient = new CognitoIdentityClient({
  region: REACT_APP_AWS_REGION,
})
export const rekog = new Rekognition({
  region: REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: cognitoIdentityClient,
    identityPoolId: REACT_APP_AWS_IDENTITY_POOL_ID!,
  }),
})

function App() {
  return (
    <ThemeProvider
      theme={{
        color: theme.color.dark,
        size: theme.size.medium,
        edgeSize: theme.edgeSize.medium,
      }}
    >
      <Router>
        <ErrorBoundry>
          <Switch>
            {routes.map((route) => {
              if (route.private) {
                return <PrivateRoute key={route.path} {...route} />
              } else if (route.publicOnly) {
                return <PublicOnlyRoute key={route.path} {...route} />
              } else {
                return <PublicRoute key={route.path} {...route} />
              }
            })}
          </Switch>
        </ErrorBoundry>
      </Router>
    </ThemeProvider>
  )
}

export default App
