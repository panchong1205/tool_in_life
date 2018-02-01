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
	if (moment().format('X') >= moment('2018-02-01').format('X') && moment().format('X') <= moment('2018-02-28').format('X')) {
        Modal.info({
            title: '新功能上线',
            content: (
				<div>
					五子棋功能上线了！两个人在一台电脑上玩五子棋
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
