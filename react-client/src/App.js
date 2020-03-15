import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import { connect } from 'react-redux';
// import { getUserLoggedIn } from './redux/auth/auth.actions.js';

import './App.css';

import { Layout } from 'antd';

import SideNav from './components/SideNav/SideNav.component.jsx';
import Footer from './components/Footer/Footer.component.jsx';
import AlertMessage from './components/AlertMessage/AlertMessage.component.jsx';
import Drawer from './components/Drawer/Drawer.component.jsx';

import BootcampsPage from './pages/BootcampsPage/BootcampsPage.component.jsx';
import LoginPage from './pages/LoginPage/LoginPage.component.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.component.jsx';
import BootcampDetailsPage from './pages/BootcampDetailsPage/BootcampsDetailsPage.components.jsx';

const App = ({ getUserLoggedIn }) => {

	// Get logged in user if exists
	
	// useEffect(() => {
	// 	getUserLoggedIn();
	// }, [getUserLoggedIn])

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Drawer />
			<AlertMessage />
			<SideNav />
			<Layout className="site-layout">
				<Switch>

					<Route exact path="/">
						<Redirect to="/bootcamps" />
					</Route>

					<Route exact path="/bootcamps">
						<BootcampsPage />
					</Route>

					<Route path="/register">
						<RegisterPage />
					</Route>

					<Route path="/login">
						<LoginPage />
					</Route>

					<Route path="/bootcamps/:bootcampId" component={BootcampDetailsPage} />	

				</Switch>

				<Footer />
				
			</Layout>
		</Layout>
	);
};

// const mapDispatchToProps = dispatch => ({
// 	getUserLoggedIn: () => dispatch(getUserLoggedIn())
// })

export default App;
