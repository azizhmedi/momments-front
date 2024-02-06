import React from "react";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/blogs">Back</Link>
    </div>
  );
}

export default ErrorPage;
