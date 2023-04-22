import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Flights } from "./components/Flight/Flights";
import { Create } from "./components/Flight/Create";
import { Edit } from "./components/Flight/Edit";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route exact path='/flights' component={Flights} />
        <Route exact path='/flight/edit/:id' component={Edit} />
        <Route exact path='/flight/create' component={Create} />
        <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
