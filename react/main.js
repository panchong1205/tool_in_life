/**
 * Created by panchong on 17/1/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import { Modal } from 'antd';
import moment from 'moment';
import App from './dev/app';
import WaiMai from './dev/waimai';
import WorkCount from './dev/workCount';
import SelectHard from './dev/selectHard';
import Award from './dev/award';
import ComponentTest from './dev/componentTest';
import WuziChess from './dev/wuziChess';
import './dev/component/import';

const main = () => {
	if (moment().format('X') >= moment('2018-01-02').format('X') && moment().format('X') <= moment('2018-01-31').format('X')) {
        Modal.info({
            title: '外卖计算器修复了新的bug',
            content: (
				<div>
					<p>1。费用为0的项目可不填</p>
					<p>2。输错或漏填时可直接修改再次计算不必再刷新页面重填</p>
				</div>
            ),
            onOk() {},
        });
	}
	ReactDOM.render(
	    (<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={WaiMai} />
				<Route path={'/workCount'} component={WorkCount} />
				<Route path={'/selectHard'} component={SelectHard} />
				<Route path={'/award'} component={Award} />
				<Route path={'/componentTest'} component={ComponentTest} />
				<Route path={'/wuziChess'} component={WuziChess} />
			</Route>
		</Router>),
	document.getElementById('root'),
 )
};
main();
