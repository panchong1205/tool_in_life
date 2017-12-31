import React from 'react';
import { Input, Button, Select, Icon, message } from 'antd';
import Header from './header';

const Option = Select.Option;
export default class Award extends React.Component{
    render() {
        return (
            <div className="flex_row_start flex_vertical_top">
                <Header keys={['4']} />
                <Content />
            </div>
        );
    }
}

const name = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export class Content extends React.Component{
    state = {
        result: '',
        count: '',
        time: '',
        option: '',
        optionList: [],
    };

    selectTime = e => {
        this.setState({
            time: e,
            count: e,
        })
    };
    handleChange = e => {
        this.setState({
            option: e.target.value,
        });
    };
    handleKeyDown = e => {
        if(e.keyCode === 13){
            this.add();
        }
    };
    add = () => {
        if(this.state.option.trim() === ''){
            message.error('输入内容');
            return;
        }
        const optionList = new Set(this.state.optionList);
        optionList.add(this.state.option);
        this.setState({
            optionList: [...optionList],
            option: '',
        });
    };
    del = item => {
        const optionList = new Set(this.state.optionList);
        optionList.delete(item);
        this.setState({
            optionList: [...optionList],
        });
    };
    clear = () => {
        this.setState({
            optionList: [],
        });
    };
    start = () => {
        const min = 1;
        const max = this.state.optionList.length;
        const time = Number.parseInt(this.state.time);
        let count = Number.parseInt(this.state.time);
        const selectIndex = setInterval(() => {
            const index = Math.round(Math.random()*(max-min))+min;
            console.log(index);
            this.setState({
                result: this.state.optionList[index - 1],
            });
        }, 100);
        const timeCount = setInterval(() => {
            count -= 1;
            this.setState({
                count,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(selectIndex);
            clearInterval(timeCount);
        }, time * 1000 );
    };
    render() {
        return (
            <div className="page fs14 selectHard award">
                <h1>进化版选择困难症治疗系统</h1>
                <p className="red">逐个添加让你陷入选择困难的词，点击抽签，系统帮你随机抽取一个或多个</p>
                <div className="flex_row_center flex_vertical_middle">
                    逐个添加让你纠结的选项：
                    <Input value={this.state.option} onChange={this.handleChange} style={{ width: 220 }} onKeyDown={this.handleKeyDown} />
                    回车或点击<a onClick={this.add}>添加</a>
                </div>
                {
                    this.state.optionList.length > 0 ?  <div className="optionList flex_row_center flex_vertical_middle">
                        你的纠结列表：
                        {
                            this.state.optionList.map(item => <div className="item" key={item}>
                                {item}
                                <Icon type="close" style={{ color: 'red'}} onClick={() => this.del(item)} />
                            </div>)
                        }
                        <Button type={'danger'} onClick={this.clear}>清空</Button>
                    </div> : null
                }
                {/*<div className="flex_row_center flex_vertical_middle list">*/}
                  {/*姓名列表：*/}
                  {/*{*/}
                      {/*name.map(item => <div key={item}>{item}</div>)*/}
                  {/*}*/}
                {/*</div>*/}
                <div className="selectTime flex_row_between">
                    <Select value={this.state.time} onChange={this.selectTime} style={{ width: 120 }}>
                        <Option value="">选择摇号时间</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                    </Select>
                    {this.state.count}
                </div>
                <div className="selectTime flex_row_between">
                    <Button type="primary" onClick={this.start} disabled={this.state.optionList.length <= 1 || this.state.time === ''}>开始抽签</Button>
                    {this.state.result}
                </div>
            </div>
        );
    }
}
