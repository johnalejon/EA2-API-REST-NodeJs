import React from 'react';
import { Header } from './components/wow/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import { Inventory } from './components/main/inventory/Inventory'
import { Brand } from './components/main/brand/Brand'
import { Type } from './components/main/type/Type'
import { User } from './components/main/user/User'
import { State } from './components/main/state/State'
import { Redirect } from 'react-router-dom';
import { InventoryUpdate } from './components/main/inventory/inventoryUpdate'
import { BrandUpdate } from './components/main/brand/brandUpdate'
import { StateUpdate } from './components/main/state/stateUpdate'
import { TypeUpdate } from './components/main/type/typeUpdate'
import { UserUpdate } from './components/main/user/userUpdate'

const InventaryApp = () => {
  return <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Inventory />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/Brand">
          <Brand />
        </Route>
        <Route exact path="/Type">
          <Type />
        </Route>
        <Route exact path="/State">
          <State />
        </Route>
        <Route exact path="/inventory/edit/:inventoryId">
          < InventoryUpdate />
        </Route>
        <Route exact path="/brand/edit/:brandId">
          < BrandUpdate />
        </Route>
        <Route exact path="/state/edit/:stateId">
          < StateUpdate /></Route>
        <Route exact path="/type/edit/:typeId">
          < TypeUpdate /></Route>
        <Route exact path="/user/edit/:userId">
          < UserUpdate /></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  </>
}

export {
  InventaryApp,
}