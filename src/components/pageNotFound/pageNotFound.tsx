import React from 'react';
import './pageNotFound.scss';

export default function PageNotFound() {
  return (
    <div className="error-page">
      <h1>Oops...</h1>
      <span>Page not found. Try later again.</span>
    </div>
  );
}
