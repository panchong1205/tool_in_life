import React from 'react';
import moment from 'moment';
import {InputNumber, Input, Button, Select, Modal} from 'antd';

const Option = Select.Option;
export default class IndexPage extends React.Component {
	constructor() {
		super();
		this.state = {
			content: new Array(2).fill(this.peopleItem()),
			peopleNum: 2,
			freight: '',
			discount: '',
			payTotal: '',
			priceTotal: '',
			paySum: '',
			picName: '',
            timer: null,
		};
	}
	componentDidMount(){
        Modal.success({
            title: '下班倒计时功能即将上线，敬请期待！',
            content: '',
        });
		const today = moment().format('YYYY-MM-DD');
		const start = Number.parseInt(moment(`${today} 09:00:00`).format('X'));
		const end = Number.parseInt(moment(`${today} 18:00:00`).format('X'));
		this.state.timer = setInterval(() => {
			const current = Number.parseInt(moment().format('X'));
			if (current >= start) {
				let hour = Number.parseInt((end - current) / 3600);
				hour = hour < 10 ? '0' + hour : hour;
				let minute = Number.parseInt(((end - current) % 3600) / 60);
                minute = minute < 10 ? '0' + minute : minute;
                let seconds = Number.parseInt(((end - current) % 3600) % 60);
                seconds = seconds < 10 ? '0' + seconds : seconds;
                console.log(`${hour}:${minute}:${seconds}`);
			} else if (current >= end) {

			}
		}, 1000);
	}
    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }
	peopleItem = () => {
		return {
			name: '',
			price: '',
			ratio: '',
			pay: '',
		}
	};
	changeNum = value => {
		const val = Number.isInteger(value) ? value : 0;
		const peopleItem = this.peopleItem();
		const contentLen = this.state.content.length;
		let content = this.state.content;
		if (val > contentLen) {
			content = content.concat(new Array(val - contentLen).fill(peopleItem));
		} else {
			content = content.filter((item, index) => index < val);
		}
		this.setState({
			content,
			peopleNum: content.length,
		});
	};
	changeContent = (label, index, e) => {
		let content = this.state.content;
		content[index] = Object.assign({}, content[index], {[label]: e.target.value});
		this.setState({
			content,
		});
	};
	handleState = (label, e) => {
		this.setState({
			[label]: e.target ? e.target.value : e,
		});
	};
	handleCharge = () => {
		let content = this.state.content;
		let priceTotal = parseFloat(this.state.payTotal) + parseFloat(this.state.discount) - parseFloat(this.state.freight);
		let payTotal = parseFloat(this.state.payTotal);
		let priceSum = 0;
		let paySum = 0;
		content = content.map(item => {
			const addStr='+' || '＋';
			if(item.price.includes(addStr)){
				console.log('包含＋');
				const values = item.price.split("+");
				let totalVal = 0;
				values.map(value => {
					totalVal += parseFloat(value);
				});
				item.price = totalVal;
			} else {
				item.price = parseFloat(item.price);
			}
			item.ratio = parseFloat(item.price/priceTotal).toFixed(4);
			item.pay = parseFloat(item.ratio * payTotal).toFixed(2);
			paySum += parseFloat(item.pay);
			priceSum += parseFloat(item.price);
			return item;
		});
		this.setState({
			content,
			priceTotal: `${priceTotal}(${priceSum})`,
			paySum,
		});
	};
	render() {
		return (<div className="page">
			<h1>外卖计算器</h1>
			<div className="flex_row_center">
				<p className="fs16">输入你们的总人数：</p>
				<InputNumber min={2} defaultValue={2} onChange={this.changeNum} value={this.state.peopleNum}/>
			</div>
			<table className="listTable fs16" cellSpacing={0}>
				<tbody>
				<tr>
					<td>姓名</td>
					{
						this.state.content.map((item, index) => <td key={`name${index}`}>
							<Input value={item.name} placeholder="输入姓名或菜名" onChange={args => this.changeContent('name', index, args)}/>
						</td>)
					}
					<td>配送＋打包</td>
					<td>优惠</td>
					<td>优惠后支付</td>
					<td>优惠前总价</td>
				</tr>
				<tr>
					<td>价格</td>
					{
						this.state.content.map((item, index) => <td key={`price${index}`}>
							<Input value={item.price} placeholder="可输入1+2+3格式" onChange={args => this.changeContent('price', index, args)}/>
						</td>)
					}
					<td><Input value={this.state.freight} placeholder="可输入1+2+3格式" onChange={args => this.handleState('freight', args)}/></td>
					<td><Input value={this.state.discount} placeholder="可输入1+2+3格式" onChange={args => this.handleState('discount', args)}/></td>
					<td><Input value={this.state.payTotal} placeholder="可输入1+2+3格式" onChange={args => this.handleState('payTotal', args)}/></td>
					<td>{this.state.priceTotal}</td>
				</tr>
				<tr>
					<td>支付比例</td>
					{
						this.state.content.map((item, index)=> <td key={`ratio${index}`}>{item.ratio}</td>)
					}
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>个人应付</td>
					{
						this.state.content.map((item, index) => <td key={`pay${index}`}>{item.pay}</td>)
					}
					<td></td>
					<td></td>
					<td>{this.state.paySum}</td>
					<td></td>
				</tr>
				</tbody>
			</table>
			<div className="flex_row_center flex_vertical_middle">
				<Button type="primary" onClick={this.handleCharge}>计算</Button>
				向
				<Select value={this.state.picName} onChange={args => this.handleState('picName', args)} style={{width: 100}}>
					<Option value="">选择收款人</Option>

				</Select>
				付款
			</div>
			{
				!this.state.picName ? <img src={`images/waimai.gif`} width={300}/> : <img src={`images/${this.state.picName}.png`} width={300}/>
			}
		</div>);
	}
}