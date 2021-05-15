import React from 'react';
import 'antd/dist/antd.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Test from './pages/test/test';
import Organization from './pages/organization/main';
import Main from './pages/main';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/main'} component={Main} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/test/:test_id'} component={Test} />
        <Route exact path={'/organization'} component={Organization} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
