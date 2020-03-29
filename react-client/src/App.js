import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

import { Layout } from 'antd';

import SideNav from './components/SideNav/SideNav.component';
import Footer from './components/Footer/Footer.component';
import AlertMessage from './components/AlertMessage/AlertMessage.component';
import Drawer from './components/Drawer/Drawer.component';
import Modal from './components/Modal/Modal.component';
import NotFound from './components/NotFound/NotFound.component';

import BootcampsPage from './pages/BootcampsPage/BootcampsPage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import RegisterPage from './pages/RegisterPage/RegisterPage.component';
import BootcampDetailsPage from './pages/BootcampDetailsPage/BootcampsDetailsPage.components';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPassword.component';
import ManageBootcampPage from './pages/ManageBootcampPage/ManageBootcampPage.component';

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Modal />
    <Drawer />
    <AlertMessage />
    <SideNav />
    <Layout className='site-layout'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/bootcamps' />
        </Route>

        <Route exact path='/bootcamps'>
          <BootcampsPage />
        </Route>

        <Route exact path='/manage-bootcamp'>
          <ManageBootcampPage />
        </Route>

        <Route path='/register'>
          <RegisterPage />
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>

        <Route
          path='/bootcamps/:bootcampId'
          component={BootcampDetailsPage}
        />

        <Route
          path='/reset-password/:token'
          component={ResetPasswordPage}
        />

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>

      <Footer />
    </Layout>
  </Layout>
);
export default App;
