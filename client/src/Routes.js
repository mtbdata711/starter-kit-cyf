import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Search from "./containers/Search";
import SingleTerm from './containers/SingleTerm';

class Routes extends Component {


    render(){
      return (
        <Fragment>
        <Router>
          <div>
    <Switch>
    <Route path="/Home" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/Signup" exact component={Signup} />
    <Route path="/Search" exact component={Search} />
    <Route path="/" component={SingleTerm}/>
    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />

            </Switch>
          </div>
        </Router>
        </Fragment>
      );

    }

    }

    export default Routes
