import React from 'react';
import { InputNumber, Input, Button, Select, Table } from 'antd';
import Header from './header';

const Option = Select.Option;
export default class WaiMai extends React.Component{
	render() {
		return (
			<div className="flex_row_start flex_vertical_top">
				<Header keys={['1']} />
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
            freight: '', // 配送打包费
            discount: '', // 优惠金额
            payTotal: '', // 实际支付
            priceTotal: '', // 商品实原价总和
			paySum: '',
			picName: '',
			disCount: '', // 折扣 例如 5.5
			priceSum: '',
			qrcode: '',
		};
	}
	componentDidMount() {
		document.getElementById('uploadCode').addEventListener('change', function () {
			function getObjectURL(file) {
				var url = null;
				if (window.createObjectURL!=undefined) {
					url = window.createObjectURL(file) ;
				} else if (window.URL!=undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file) ;
				} else if (window.webkitURL!=undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file) ;
				}
				return url ;
			};
			for (let i = 0; i < this.files.length; i++) {
				document.getElementById('collectCode' + i).src = getObjectURL(this.files[i]);
			}
		});
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
            priceTotal: `${priceTotal.toFixed(2)}(${priceSum.toFixed(2)})`,
            paySum: paySum.toFixed(2),
            discount: discount.toFixed(2),
            freight: freight.toFixed(2), // 配送打包费
            payTotal: payTotal.toFixed(2), // 实际支付
		});
	};
	addOneByOne = num => {
		console.log(num);
		num = num.toString().trim() ? num.toString().trim() : '0';
        const addStr='+' || '＋';
        if(num.includes(addStr)){
            console.log('包含＋');
            const values = num.split("+");
            let totalVal = 0;
            values.map(value => {
                totalVal += Number.parseFloat(value);
            });
            return totalVal;
        } else {
            return Number.parseFloat(num);
        }
	};
	handleDiscount = () => { // 计算折扣
		let priceSum = 0;
		let paySum = 0;
		const content = this.state.content.map(item => {
			const pay = (Number(item.price) * Number(this.state.disCount) / 10).toFixed(2);
			paySum += parseFloat(pay);
			priceSum += parseFloat(item.price);
			return {
				...item,
				pay,
			}
		});
		this.setState({
			content,
			paySum: paySum.toFixed(2),
			priceSum: priceSum.toFixed(2),
		})
	};
	render() {
		return (<div className="page">
			<h1>外卖计算器</h1>
			<div className="flex_row_center">
				<p className="fs16">输入你们的总人数：</p>
				<InputNumber min={2} defaultValue={2} onChange={this.changeNum} value={this.state.peopleNum}/>
			</div>
			<br/>
			<p className="fs18">外卖整单满减按每人商品价格比例享受优惠</p>
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
			</div>
			<br/>
			<p className="fs18">全单折扣计算</p>
			<table className="listTable fs16" cellSpacing={0}>
				<tbody>
				<tr>
					<td>姓名</td>
					{
						this.state.content.map((item, index) => <td key={`name${index}`}>
							<Input value={item.name} placeholder="输入姓名或菜名" onChange={args => this.changeContent('name', index, args)}/>
						</td>)
					}
					<td>合计</td>
				</tr>
				<tr>
					<td>原价</td>
					{
						this.state.content.map((item, index) => <td key={`price${index}`}>
							<Input value={item.price} placeholder="" onChange={args => this.changeContent('price', index, args)}/>
						</td>)
					}
					<td>
						{this.state.priceSum}
					</td>
				</tr>
				<tr>
					<td>个人应付</td>
					{
						this.state.content.map((item, index) => <td key={`pay${index}`}>{item.pay}</td>)
					}
					<td>
						{this.state.paySum}
					</td>
				</tr>
				</tbody>
			</table>
			折扣：<Input style={{ width: 120 }} value={this.state.disCount} onChange={e => this.handleState('disCount', e.target.value)}/> 输入示例:5.5 表示五五折
			<Button type={'primary'} onClick={this.handleDiscount}>计算</Button>
			<br/>
			<br/>
			<p>
				添加你的收款码,可以同时多选文件 一起添加支付宝和微信的收款码
			</p>
			<input type="file" accept="image/*" id="uploadCode" multiple placeholder="添加你的收款码图片"/>
			<div className="flex_row_center flex_vertical_middle">
				<img style={{
					display: 'block',
					margin: 'auto 20px',
					maxWidth: '300px',
				}} id="collectCode0" src="" alt=""/>
				<img style={{
					display: 'block',
					margin: 'auto 20px',
					maxWidth: '300px',
				}} id="collectCode1" src="" alt=""/>
			</div>
		</div>);
	}
}
