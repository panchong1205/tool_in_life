import React from 'react';
import { InputNumber, Input, Button, Select } from 'antd';
import Sider from './sider';

const Option = Select.Option;
export default class WaiMai extends React.Component{
	render() {
		return (
			<div className="flex_row_start flex_vertical_top">
				<Sider keys={['1']} />
				<WaiMaiItem />
			</div>
		);
	}
}
export class WaiMaiItem extends React.Component {
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
		};
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
        let payTotal = this.addOneByOne(this.state.payTotal);
        let discount = this.addOneByOne(this.state.discount);
        let freight = this.addOneByOne(this.state.freight);
		let priceTotal = payTotal + discount - freight;
		let priceSum = 0;
		let paySum = 0;
		content = content.map(item => {
            item.price = this.addOneByOne(item.price);
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
	addOneByOne = num => {
        const addStr='+' || '＋';
        if(num.includes(addStr)){
            console.log('包含＋');
            const values = num.split("+");
            let totalVal = 0;
            values.map(value => {
                totalVal += parseFloat(value);
            });
            return totalVal;
        } else {
            return parseFloat(num);
        }
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