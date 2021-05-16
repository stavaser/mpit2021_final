import React from 'react';
import 'antd/dist/antd.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Test from './pages/test/test';
import Main from './pages/main';
import About from './pages/about';
import Courses from './pages/courses';
import CourseMaterial from './pages/courseMaterial';

// org pages
import Organization from './pages/organization/main';
import OrgAbout from './pages/organization/about';
import Profile from './pages/profile';

console.log(localStorage.getItem('isOrg'));
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/organization'} component={Organization} />
        <Route
          exact
          path={'/organization/about/:vacancy_id'}
          component={OrgAbout}
        />
        <Route exact path={'/main'} component={Main} />
        <Route exact path={'/about/:vacancy_id'} component={About} />
        <Route exact path={'/courses'} component={Courses} />
        <Route exact path={'/courses/:skill'} component={Courses} />
        <Route
          exact
          path={'/courses/info/:course_id'}
          component={CourseMaterial}
        />

        <Route exact path={'/test/:test_id'} component={Test} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/profile'} component={Profile} />
        <Route exact path={'/test'} component={Test} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
