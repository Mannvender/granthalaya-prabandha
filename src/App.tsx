// library imports
import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import "./App.css"
import theme from "theme"
import routes from "routes"
import PublicRoute from "routes/Public"
import PublicOnlyRoute from "routes/PublicOnly"
import PrivateRoute from "routes/Private"

function App() {
  return (
    <ThemeProvider
      theme={{
        color: theme.color.dark,
        size: theme.size.medium,
        edgeSize: theme.edgeSize,
      }}
    >
      <Router>
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
      </Router>
    </ThemeProvider>
  )
}

export default App
