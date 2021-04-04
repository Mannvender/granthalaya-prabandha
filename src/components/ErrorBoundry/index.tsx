import React, { ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}
type State = {
  hasError: boolean
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // @TODO: You can also log the error to an error reporting service
    console.error('ErrorBoundry: ' + error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
