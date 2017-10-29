import React from 'react';
import { Button, Input, message } from 'antd';
import Sider from './sider';

export default class SelectHard extends React.Component {
    render() {
        return (
            <div className="flex_row_start flex_vertical_top">
                <Sider keys={['3']} />
                <Content />
            </div>
        );
    }
}

export class Content extends React.Component{
    state = {
        option: '',
        optionList: [],
        result: [],
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
    decide = () => {
        const min = 1;
        const max = this.state.optionList.length;
        const index = Math.round(Math.random()*(max-min))+min;
        const result = new Set(this.state.result);
        const optionList = new Set(this.state.optionList);
        result.add(this.state.optionList[index - 1]);
        optionList.delete(this.state.optionList[index - 1]);
        this.setState({
            optionList: [...optionList],
            result: [...result],
        });
    };
    reset = () => {
        let optionList = this.state.optionList;
        optionList = optionList.concat(this.state.result);
        this.setState({
            option: '',
            optionList: [...optionList],
            result: [],
        });
    };
    render() {
        return (
            <div className="page selectHard fs14">
                <h1>选择困难症治疗系统</h1>
                <p className="red">逐个添加让你陷入选择困难的词，点击抽签，系统帮你随机抽取一个或多个</p>
                <div className="flex_row_center flex_vertical_middle">
                    逐个添加让你纠结的选项：
                    <Input value={this.state.option} onChange={this.handleChange} style={{ width: 220 }} onKeyDown={this.handleKeyDown} />
                    <a onClick={this.add}>添加</a>
                </div>
                {
                    this.state.optionList.length > 0 ?  <div className="optionList flex_row_center flex_vertical_middle">
                        你的纠结列表：
                        {
                            this.state.optionList.map(item => <div className="item" key={item}>{item}</div>)
                        }
                        <Button type={'primary'} onClick={this.decide} disabled={this.state.optionList.length < 2}>抽签</Button>
                    </div> : null
                }
                {
                    this.state.result.length > 0 ? <div className="optionList flex_row_center flex_vertical_middle">
                        抽签结果：
                        {
                            this.state.result.map(item => <div className="item" key={item}>{item}</div>)
                        }
                        <Button type={'primary'} onClick={this.reset}>重来</Button>
                    </div> : null
                }

            </div>
        );
    }
}