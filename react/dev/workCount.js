import React from 'react';
import moment from 'moment';
import { Input, Button } from 'antd';
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
        start: '09:00:00',
        end: '18:00:00',
    };
    componentDidMount(){
        this.count();
    }
    count = () => {
        const today = moment().format('YYYY-MM-DD');
        const start = Number.parseInt(moment(`${today} ${this.state.start}`).format('X'));
        const end = Number.parseInt(moment(`${today} ${this.state.end}`).format('X'));
        this.state.timer = setInterval(() => {
            const current = Number.parseInt(moment().format('X'));
            if (current >= start && current <= end) {
                let hour = Number.parseInt((end - current) / 3600);
                hour = hour < 10 ? '0' + hour : hour;
                let minute = Number.parseInt(((end - current) % 3600) / 60);
                minute = minute < 10 ? '0' + minute : minute;
                let seconds = Number.parseInt(((end - current) % 3600) % 60);
                seconds = seconds < 10 ? '0' + seconds : seconds;
                this.updateTime('time', `${hour}:${minute}:${seconds}`);
            } else if (current > end) {
                clearInterval(this.state.timer);
                this.updateTime('timer', null);
            }
        }, 1000);
    };
    updateTime = (name, time) => {
        this.setState({
            [name]: time,
        });
    };
    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
            this.setState({
                timer: null,
            });
        }
    }
    handleState = (name, e) => {
        const value = e.target ? e.target.value : e;
        this.setState({
            [name]: value,
        });
    };
    render() {
        return (
            <div className="page">
                上班时间：<Input style={{ width: 120 }} value={this.state.start} onChange={args => this.handleState('start', args)} />
                下班时间：<Input style={{ width: 120 }} value={this.state.end} onChange={args => this.handleState('end', args)} />
                <Button onClick={this.count}>开始计时</Button>
                <h3>距离下班还有</h3>
                <h1>
                    {this.state.time}
                </h1>
                {
                    this.state.timer === null ? <img src={`images/workEnd.gif`} width={300} /> : null
                }
            </div>
        );
    }
}
