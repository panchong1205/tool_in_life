import React from 'react';
import moment from 'moment';
import Sider from './sider';

export default class WorkCount extends React.Component{
    render() {
        return (
            <div className="flex_row_start flex_vertical_top">
                <Sider keys={['2']} />
                <Content />
            </div>
        );
    }
}

export class Content extends React.Component{
    state = {
        timer: null,
        time: '00:00:00',
    };
    componentDidMount(){
        const today = moment().format('YYYY-MM-DD');
        const start = Number.parseInt(moment(`${today} 09:00:00`).format('X'));
        const end = Number.parseInt(moment(`${today} 18:00:00`).format('X'));
        this.state.timer = setInterval(() => {
            const current = Number.parseInt(moment().format('X'));
            if (current >= start && current <= end) {
                let hour = Number.parseInt((end - current) / 3600);
                hour = hour < 10 ? '0' + hour : hour;
                let minute = Number.parseInt(((end - current) % 3600) / 60);
                minute = minute < 10 ? '0' + minute : minute;
                let seconds = Number.parseInt(((end - current) % 3600) % 60);
                seconds = seconds < 10 ? '0' + seconds : seconds;
                console.log(`${hour}:${minute}:${seconds}`);
                this.setState({
                    time: `${hour}:${minute}:${seconds}`,
                })
            } else if (current > end) {
                console.log('下班了');
                clearInterval(this.state.timer);
            }
        }, 1000);
    }
    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }
    render() {
        return (
            <div className="page">
                <h3>距离下班还有</h3>
                <h1>
                    {this.state.time}
                </h1>
            </div>
        );
    }
}
