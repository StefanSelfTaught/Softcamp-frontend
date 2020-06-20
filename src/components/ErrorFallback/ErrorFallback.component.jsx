import React from 'react';
import ErrorImage from 'assets/error.png';

import './ErrorFallback.styles.css';

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => (
  <div className="error-container" role="alert">
    <img
      className="error-image"
      width="100"
      height="100"
      src={ErrorImage}
      alt="error"
    />
    <p>Something went wrong</p>
    <pre>{error.message}</pre>
  </div>
);

export default ErrorFallback;
