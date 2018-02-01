/**created by panchong on 2018/1/16**/
import React from 'react';
import { message } from 'antd';
import Header from './header';
import Promise from 'es6-promise';

const black = '#000';
const white = '#fff';
const colors = [black, white];
export default class WuziChess extends React.Component{
    state = {
        coordinateArray: [],
        current: Math.round(Math.random()),
        up2down: [],
        left2right: [],
        leftup2rightdown: [],
        rightup2leftdown: [],
        hasLined: [],
    };
    rectMouseDown = e => {
        e.preventDefault();
        if (this.state.up2down.length >= 5
        || this.state.left2right.length >= 5
        || this.state.leftup2rightdown.length >= 5
        || this.state.rightup2leftdown.length >= 5) {
            message.success('重新开棋');
            return;
        }
        const coordinate = new GetCoordinate('rectBody', e);
        const coordinateArray = new Set(this.state.coordinateArray);
        coordinate.getNeedXY().then(data => {
            if (typeof data !== 'undefined') {
                const resultData = Object.assign({}, data, { color: this.state.current });
                if (coordinateArray.has(JSON.stringify(Object.assign({}, data, { color: 0 })))
                    || coordinateArray.has(JSON.stringify(Object.assign({}, data, { color: 1 })))) {
                    return;
                }
                coordinateArray.add(JSON.stringify(resultData));
                const result = [...coordinateArray];
                this.setState({
                    coordinateArray: result,
                    current: JSON.parse(result[coordinateArray.size - 1]).color === 0 ? 1 : 0,
                    up2down: [JSON.stringify(resultData)],
                    left2right: [JSON.stringify(resultData)],
                    leftup2rightdown: [JSON.stringify(resultData)],
                    rightup2leftdown: [JSON.stringify(resultData)],
                });
                this.judge(resultData, result, 'up2down', [JSON.stringify(resultData)]);
                this.judge(resultData, result, 'left2right', [JSON.stringify(resultData)]);
                this.judge(resultData, result, 'leftup2rightdown', [JSON.stringify(resultData)]);
                this.judge(resultData, result, 'rightup2leftdown', [JSON.stringify(resultData)]);
            }
        });
    };
    clear = () => {
        this.setState({
            coordinateArray: [],
            current: Math.round(Math.random()),
            up2down: [],
            left2right: [],
            leftup2rightdown: [],
            rightup2leftdown: [],
            hasLined: [],
        })
    };
    judge = (data, array, direction, directionArray) => {
        let up = {
            x: data.x,
            y: data.y,
            color: data.color,
        };
        let down = {
            x: data.x,
            y: data.y,
            color: data.color,
        };
        const basic = new GetCoordinate().getBasic();
        const line = new Set(directionArray);
        const pointArray = new Set(array);
        switch (direction) {
            default: break;
            case 'up2down': up = Object.assign({}, up, { y: data.y - basic }); down = Object.assign({}, down, { y: data.y + basic });break;
            case 'left2right': up = Object.assign({}, up, { x: data.x - basic }); down = Object.assign({}, down, { x: data.x + basic });break;
            case 'leftup2rightdown': up = Object.assign({}, up, { x: data.x - basic, y: data.y - basic }); down = Object.assign({}, down, { x: data.x + basic, y: data.y + basic });break;
            case 'rightup2leftdown': up = Object.assign({}, up, { x: data.x + basic, y: data.y - basic }); down = Object.assign({}, down, { x: data.x - basic, y: data.y + basic });break;
        }
        Promise.all([new Promise((resolve, rejected) => {
            if (pointArray.has(JSON.stringify(up))) {
                resolve({
                    state: true,
                    point: up,
                });
                return;
            }
            resolve({
                state: false,
                point: up,
            });
        }), new Promise((resolve, rejected) => {
            if (pointArray.has(JSON.stringify(down))) {
                resolve({
                    state: true,
                    point: down,
                });
                return;
            }
            resolve({
                state: false,
                point: down,
            });
        })]).then(data => {
            if (line.size < 5) {
                const trueData = data.filter(item => item.state);
                if (trueData.length === 0) {
                    return;
                }
                trueData.map(item => {
                    if (!line.has(JSON.stringify(item.point))) {
                        line.add(JSON.stringify(item.point));
                        this.setState({
                            [direction]: [...line],
                        });
                        if (line.size === 5) {
                            message.success('5子连线了');
                            this.setState({
                                hasLined: [...line],
                            });
                            return;
                        }
                        this.judge(item.point, array, direction, [...line]);
                    }
                });
            }
        });
    };
    render() {
        const array = new Array(25).fill('');
        return <div className="componentTest">
            <Header keys={['6']} />
            <div className="flex_column_start">
                <div className="flex_row_start">
                    棋子分配：左<div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors[0],
                }}/>右<div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors[1],
                }}/>
                </div>
                <div className="flex_row_start">
                    当前出棋
                    <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: colors[this.state.current],
                    }}/>
                    <button onClick={this.clear}>清空</button>
                </div>
                <div className="rect"
                     id="rectBody"
                     onMouseDown={this.rectMouseDown}
                >
                    {
                        this.state.coordinateArray.map(item => <div key={item} style={{
                            position: 'absolute',
                            left: JSON.parse(item).x - 10,
                            top: JSON.parse(item).y - 10,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: colors[JSON.parse(item).color],
                            zIndex: 2,
                        }}/>)
                    }
                    {
                        this.state.hasLined.map(item => <div key={item} style={{
                            position: 'absolute',
                            left: JSON.parse(item).x - 5,
                            top: JSON.parse(item).y - 5,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#fd4141',
                            zIndex: 3,
                        }}/>)
                    }
                    <table cellPadding={0} cellSpacing={0}>
                        <tbody>
                        {
                            array.map(() => <tr>
                                {
                                    array.map(() => <td></td>)
                                }
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}
class GetCoordinate{
    constructor(parentId, event) {// 元素id，鼠标事件
        if (parentId && event) {
            const rect = document.getElementById(parentId);
            this.parentX = rect.offsetLeft;//元素距离页面左边
            this.parentY = rect.offsetTop;//元素距离页面顶部
            this.selfX = event.pageX;//鼠标点距离页面左边
            this.selfY = event.pageY;//鼠标点距离页面顶部
            this.x = event.pageX - rect.offsetLeft;
            this.y = event.pageY - rect.offsetTop;
        }
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getXY() {
        return {
            x: this.x,
            y: this.y,
        }
    }
    getBasic() {
        return 40; // 坐标基准
    }
    getError() {
        return 15; // 鼠标点击时有效误差范围
    }
    getNeedXY() {
        const error = this.getError();
        const basic = this.getBasic();
        return new Promise((resolve, rejected) => {
            Promise.all([new Promise((resolve, rejected) => {
                if (this.x % basic >= basic - error) {
                    resolve((Number.parseInt(this.x / basic) + 1) * basic);
                    return;
                }
                if (this.x % basic === 0) {
                    resolve(this.x);
                }
                if (this.x % basic <= error) {
                    resolve(Number.parseInt(this.x / basic) * basic);
                }
            }), new Promise((resolve, rejected) => {
                if (this.y % basic >= basic - error) {
                    resolve((Number.parseInt(this.y / basic) + 1) * basic);
                    return;
                }
                if (this.y % basic === 0) {
                    resolve(this.y);
                }
                if (this.y % basic <= error) {
                    resolve(Number.parseInt(this.y / basic) * basic);
                }
            })]).then(data => {
                if (data[0] !== null && data[1] !== null) {
                    resolve({
                        x: data[0],
                        y: data[1],
                    });
                }
            });
        });
    }
}
class JudgeLine{
    constructor(coordinate) {
        this.x = coordinate.x;
        this.y = coordinate.y;
        this.judge();
    }
    judge() {
        Promise.all([new Promise((resolve, rejected) => {

        }), new Promise((resolve, rejected) => {

        }), new Promise((resolve, rejected) => {

        }), new Promise((resolve, rejected) => {

        })])
    }
}
