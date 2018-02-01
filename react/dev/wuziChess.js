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
    };
    rectMouseDown = e => {
        e.preventDefault();
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
                this.judgeUp2Down(resultData, result);
                this.judgeLeft2Right(resultData, result);
                this.judgeLeftUp2RightDown(resultData, result);
                this.judgeRightUp2LeftDown(resultData, result);
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
        })
    };
    judgeUp2Down = (data, array) => {
        const basic = new GetCoordinate().getBasic();
        const line = new Set(this.state.up2down);
        const pointArray = new Set(array);
        Promise.all([new Promise((resolve, rejected) => {
            const up = {
                x: data.x,
                y: data.y - basic,
                color: data.color,
            };
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
            const down = {
                x: data.x,
                y: data.y + basic,
                color: data.color,
            };
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
                            up2down: [...line],
                        });
                        if (line.size === 5) {
                            message.success('上下5子连线了');
                            return;
                        }
                        this.judgeUp2Down(item.point, array);
                    }
                });
            }
        });
    };
    judgeLeft2Right = (data, array) => {
        const basic = new GetCoordinate().getBasic();
        const line = new Set(this.state.left2right);
        const pointArray = new Set(array);
        Promise.all([new Promise((resolve, rejected) => {
            const up = {
                x: data.x - basic,
                y: data.y,
                color: data.color,
            };
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
            const down = {
                x: data.x + basic,
                y: data.y,
                color: data.color,
            };
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
                            left2right: [...line],
                        });
                        console.log([...line]);
                        if (line.size === 5) {
                            message.success('左右5子连线了');
                            return;
                        }
                        this.judgeLeft2Right(item.point, array);
                    }
                });
            }
        });
    };
    judgeLeftUp2RightDown = (data, array) => {
        const basic = new GetCoordinate().getBasic();
        const line = new Set(this.state.leftup2rightdown);
        const pointArray = new Set(array);
        Promise.all([new Promise((resolve, rejected) => {
            const up = {
                x: data.x - basic,
                y: data.y - basic,
                color: data.color,
            };
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
            const down = {
                x: data.x + basic,
                y: data.y + basic,
                color: data.color,
            };
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
                            leftup2rightdown: [...line],
                        });
                        console.log([...line]);
                        if (line.size === 5) {
                            message.success('左上右下5子连线了');
                            return;
                        }
                        this.judgeLeftUp2RightDown(item.point, array);
                    }
                });
            }
        });
    };
    judgeRightUp2LeftDown = (data, array) => {
        const basic = new GetCoordinate().getBasic();
        const line = new Set(this.state.rightup2leftdown);
        const pointArray = new Set(array);
        Promise.all([new Promise((resolve, rejected) => {
            const up = {
                x: data.x + basic,
                y: data.y - basic,
                color: data.color,
            };
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
            const down = {
                x: data.x - basic,
                y: data.y + basic,
                color: data.color,
            };
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
                            rightup2leftdown: [...line],
                        });
                        console.log([...line]);
                        if (line.size === 5) {
                            message.success('右上左下5子连线了');
                            return;
                        }
                        this.judgeRightUp2LeftDown(item.point, array);
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
                    当前出棋
                    <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: colors[this.state.current],
                    }}>
                    </div>
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
