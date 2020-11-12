import React from "react";
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";

const App = () => {
  return (
    <div>
        <p>
            hello world
        </p>
    </div>
  );
};

export default withRouter(App);