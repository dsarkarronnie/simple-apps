import React, { Component, Suspense } from 'react';
import TODOApp from './containers/TODO'
// import EWallet from './containers/EWallet'
import Layout from './Layout/Layout'
// import asyncComponent from './hoc/AsyncComponent'
import { Router, Route, NavLink, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import RouteWrapper from './hoc/RouteWrapper';
import './App.css';
// const AsyncComponentEWallet = asyncComponent(() => {
//   return import('./containers/EWallet');
// })
const AsyncComponentEWallet = React.lazy(() => {
  return import('./containers/EWallet');
})
class App extends Component {
  state = {
    authorization: {
      todoapp: true,
      ewallet: true,
    }
  };

  render() {
    return (
      <div className="App">
        {/* <Router history={this.state.history}> */}
        <BrowserRouter>
          <Layout>
            {/* <TODOApp></TODOApp>
            <EWallet></EWallet> */}
            <Redirect from="/" to="/todoapp" />
            <Switch>
              <Route strict component={RouteWrapper} path='/' />
              {this.state.authorization.ewallet ?
                (<Route strict render={() =>
                  <Suspense fallback={<div>Loading ...</div>}>
                    <AsyncComponentEWallet></AsyncComponentEWallet>
                  </Suspense>
                } path='/ewallet' />) :
                <Redirect from="/ewallet" to="/notauthorized" />
              }
              <Route strict render={() => <h1>NOT AUTHORIZED TO ACCESS PAGE</h1>} path='/notauthorized' />
              <Route render={() => <h1>PAGE NOT FOUND!</h1>} />
            </Switch>
          </Layout>
        </BrowserRouter>
        {/* </Router> */}
      </div>
    );
  }
}
export default App;
