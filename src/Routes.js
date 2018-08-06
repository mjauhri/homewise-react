import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login"
import ClientRegistration from "./ClientRegistration"
import Registration from "./Registration"
import VendorRegistration from "./VendorRegistration"
import AllClients from "./AllClients"
import Steps from "./Steps"
import SingleStep from "./SingleStep"

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/ALlClients" exact component={AllClients} />
    <Route path="/login" exact component={Login} />
    <Route path="/ClientReg" exact component={ClientRegistration} />
    <Route path="/Reg" exact component={Registration} />
    <Route path="/VendorReg" exact component={VendorRegistration} />
    <Route path="/Steps" exact component={Steps} />
    <Route path="/SingleStep" exact component={SingleStep} />
  </Switch>;