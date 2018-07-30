/**created by panchong on 2018/7/30**/
import React, { Component } from 'react';
import { Icon, message } from 'antd';
import moment from 'moment';
import './calender.less';

export default class Calender extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            dateList: [],
        };
    }
    componentDidMount() {
        this.getDateList(moment().format('YYYY-MM-DD'));
    }
    changeDate = (name, e) => {
        const value = e.target ? e.target.value : e;
        this.getDateList(value);
    };
    getDateList = date => {
        const YYYYMMDD = 'YYYY-MM-DD';
        const thisDay = moment(date);
        const thisYear = thisDay.format('YYYY');
        const thisMonth = thisDay.format('MM');
        // 当月1号的时间戳
        const thisMonthFirstTimes = Number(moment(`${thisYear}-${thisMonth}-1`).format('x'));
        // 判断当月1号是一周的第几天
        let thisMonthFirstInWeek = Number(moment(`${thisYear}-${thisMonth}-1`).format('E'));
        thisMonthFirstInWeek = thisMonthFirstInWeek - 1;
        const getDateByFirst = num => {
            return thisMonthFirstTimes + (num * 1000 * 60 * 60 * 24)
        };
        const dateList = new Array(42).fill('').map((item, index) => {
            // 一个月按42个格子算，计算每个格子的时间戳
            const current = getDateByFirst(index - thisMonthFirstInWeek);
            return {
                year: Number(moment(current).format('YYYY')), // 年
                month: Number(moment(current).format('MM')), // 月
                day: Number(moment(current).format('DD')), // 日,
                date: `${moment(current).format(YYYYMMDD)}`, // 选中后进行请求要发送的值 '2018-5-9',
                timestamp: Number(moment(current).format('x')), //时间戳
            }
        });
        this.setState({
            dateList,
            date,
        });
    };

    render() {
        const YYYYMM = 'YYYY-MM';
        const weekName = ['一', '二', '三', '四', '五', '六', '日'];
        return (
            <div className="calender">
                <div className="flex_row_center flex_vertical_middle headMonth">
                    <button
                        onClick={() => {
                            const current = moment(this.state.date);
                            const clickMonth = Number(current.format('MM')) > 1 ? Number(current.format('MM')) - 1 : 12;
                            const clickYear = Number(current.format('MM')) > 1 ? Number(current.format('YYYY')) : Number(current.format('YYYY')) - 1;
                            this.changeDate('date', `${clickYear}-${clickMonth}-1`);
                        }}
                    >
                        <Icon type="caret-left"/>
                    </button>
                    {moment(this.state.date).format('YYYY年MM月')}
                    <button
                        onClick={() => {
                            const current = moment(this.state.date);
                            const clickMonth = Number(current.format('MM')) < 12 ? Number(current.format('MM')) + 1 : 1;
                            const clickYear = Number(current.format('MM')) < 12 ? Number(current.format('YYYY')) : Number(current.format('YYYY')) + 1;
                            this.changeDate('date', `${clickYear}-${clickMonth}-1`);
                        }}
                    >
                        <Icon type="caret-right"/>
                    </button>
                </div>
                <div className="flex_row_start">
                    {
                        weekName.map((item, index) => <div
                            key={`week${index}`}
                            className="dateItem flex_column_center flex_vertical_middle"
                            style={{
                                borderTop: 'none',
                            }}
                        >
                            {item}
                        </div>)
                    }
                    {
                        this.state.dateList.map((item, index) => <div
                            key={`week${index}`}
                            style={
                                item.month !== Number(moment(this.state.date).format('MM')) ||
                                item.year !== Number(moment(this.state.date).format('YYYY')) ? {
                                    color: '#ccc',
                                } : {}
                            }
                            className={`dateItem flex_column_center flex_vertical_middle ${item.timestamp === Number(moment(this.state.date).format('x')) ? 'selected' : ''}`}
                        >
                            {item.day}
                        </div>)
                    }
                </div>
            </div>
        );
    };
}
