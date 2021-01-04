import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, Component }) => {
  return (
    <Route>
      {() => {
        return loggedIn ? Component : <Redirect to="/sign-up" />;
      }}
    </Route>
  );
};

export default ProtectedRoute;
