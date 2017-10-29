/**
 * Created by panchong on 17/1/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import App from './dev/app';
import WaiMai from './dev/waimai';
import WorkCount from './dev/workCount';
import SelectHard from './dev/selectHard';
import './dev/import';

const main = () => {
	ReactDOM.render(
	    (<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={WaiMai} />
				<Route path={'/workCount'} component={WorkCount} />
				<Route path={'/selectHard'} component={SelectHard} />
			</Route>
		</Router>),
	document.getElementById('root'),
 )
};
main();
