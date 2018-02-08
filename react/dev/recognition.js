/**created by panchong on 2018/2/7**/
import React from 'react';
import Header from './header';
import './recognition.less';
const mathjaxHelper = require('mathjax-electron');

export default class Recognition extends React.Component{
    state = {
        hanwangyun: '{\\frac {1}{2}} \\div  1 = \\frac {1}{2}',
    };
    componentDidMount() {
        this.handleHanwang2();
    }
    handleHanwang1 = () => {
        let result = this.state.hanwangyun;
        // let removeBlank = result.match(/(?<=\{)[^}]*(?<=\})/g);//查找花括号中间的内容
        if (result.includes('{') || result.includes('}')) {
            result = result.replace(/{/g, '' );
            result = result.replace(/}/g, '' );
        }
        const resultArray = result.split(/\s/g);
        console.log(resultArray);
        result = resultArray.map(item => {
            if (item.match(/imes/)) { // 乘号
                return item.replace(/imes/, '×' );
            }
            if (item.match(/div/)) { // 除号
                return item.replace(/div/, '÷' );
            }
            if (item.startsWith('sqrt')) {// 开根号
                let obj = item.replace(/sqrt/, '');
                obj = `<div class="borderTop">${obj}</div>`;
                return `√${obj}`;
            }
            if (item.includes('^')) {// 右上角平方
                const obj = item.split('^');
                return `${obj[0]}<sup>${obj[1]}</sup>`;
            }
            if (item.includes('_')) {// 右下角脚标
                const obj = item.split('_');
                return `${obj[0]}<sub>${obj[1]}</sub>`;
            }
            return item;
        });
        result.map(item => {
            document.getElementById('recognition').innerHTML += item;
        });
    };
    handleHanwang2 = () => {
        let result = this.state.hanwangyun;
        // result = result.replace(/%0C/g, '\\\\f');
        console.log(result);
        const container = document.getElementById('recognition');
        container.innerHTML = `$$${result}$$`;
        mathjaxHelper.loadAndTypeset(document, container);
    };
    render() {
        return (
            <div className="recognition">
                <Header keys={['7']} />
                <h4>
                    识别结果：
                </h4>
                <div id="recognition" className="flex_row_center flex_vertical_middle">
                </div>
            </div>
        );
    }
}