import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('Caught error:', error, errorInfo);
        this.setState({ errorInfo: errorInfo }); // Store error info
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h1>Something went wrong.</h1>
                    <p>We've logged the error and are working on a fix.</p>
                    {/* Optionally display error details in development */}
                    {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                        <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                            {this.state.errorInfo.componentStack}
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;