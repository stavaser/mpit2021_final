import React from 'react';
import 'antd/dist/antd.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/auth/login';
import Main from './pages/main';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/login'} component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
