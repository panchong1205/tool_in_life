/**
 * Created by panchong on 17/1/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './dev/app';
import IndexPage from './dev/indexPage';
import './dev/import';

const main = () => {
	ReactDOM.render(
	    (<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={IndexPage} />
			</Route>
		</Router>),
	document.getElementById('root'),
 )
};
main();
