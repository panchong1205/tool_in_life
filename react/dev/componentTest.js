/**created by panchong on 2018/1/16**/
import React from 'react';
import QRCode from 'qrcode.react';
import Header from './header';
import Promise from 'es6-promise';
import './componentTest.less';

const black = '#000';
const white = '#fff';
const red = '#fd4141';
const colors = [black, white, red];
export default class ComponentTest extends React.Component{
    state = {
        startX: null,
        startY: null,
        coordinateArray: [],
        current: Math.round(Math.random() * (colors.length - 1)),
    };
    handleDownload = () => {
        const canvas = document.getElementsByTagName('canvas')[0];
        const aLink = document.getElementById('code1');
        const MIME_TYPE = "image/png";
        aLink.download = '23.png';
        aLink.href = canvas.toDataURL("image/png");
        aLink.dataset.downloadurl = [MIME_TYPE, aLink.href].join(':');
    };
    componentDidMount() {
        const canvas = document.getElementsByTagName('canvas')[0];
        const ctx = canvas.getContext('2d');
        const img = document.getElementById('logo');
        setTimeout(() => {
            ctx.drawImage(img, 0, 0, 32, 32, 48, 48, 20,20);
        }, 200)
    }
    rectMouseDown = e => {
        e.preventDefault();
        const coordinate = new GetCoordinate('rectBody', e);
        this.setState({
            startX: coordinate.getX(),
            startY: coordinate.getY(),
        });
        const coordinateArray = new Set(this.state.coordinateArray);
        coordinate.getNeedXY().then(data => {
            if (typeof data !== 'undefined') {
                if (coordinateArray.has(JSON.stringify(Object.assign({}, data, { color: this.state.current })))) {
                    coordinateArray.delete(JSON.stringify(Object.assign({}, data, { color: this.state.current })));
                    this.setState({
                        coordinateArray: [...coordinateArray],
                    });
                    return;
                }
                coordinateArray.add(JSON.stringify(Object.assign({}, data, { color: this.state.current })));
                const result = [...coordinateArray];
                this.setState({
                    coordinateArray: result,
                });
            }
        });
    };
    rectMouseMove = e => {
        if (this.state.startX !== null) {
            const coordinateArray = new Set(this.state.coordinateArray);
            const coordinate = new GetCoordinate('rectBody', e);
            coordinate.getNeedXY().then(data => {
                if (typeof data !== 'undefined') {
                    coordinateArray.add(JSON.stringify(Object.assign({}, data, { color: this.state.current })));
                    const result = [...coordinateArray];
                    this.setState({
                        coordinateArray: result,
                    });
                }
            });
        }
    };
    rectMouseUp = e => {
        this.setState({
            startX: null,
            startY: null,
        });
    };
    render() {
        const array = new Array(25).fill('');
        return <div className="componentTest">
            <Header keys={['5']} />
            <p>二维码中间插入logo，前端下载图片</p>
            <QRCode
                value="aaaaaaaaa"
            />
            <a id="code1" onClick={this.handleDownload}>
                下载二维码
            </a>
            <img style={{ display: 'none' }} src="images/favicon.png" alt="" id="logo" width={100}/>
            <div className="flex_row_start">
                <div className="rect"
                     id="rectBody"
                     onMouseDown={this.rectMouseDown}
                     onMouseMove={this.rectMouseMove}
                     onMouseUp={this.rectMouseUp}
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
        const rect = document.getElementById(parentId);
        this.parentX = rect.offsetLeft;//元素距离页面左边
        this.parentY = rect.offsetTop;//元素距离页面顶部
        this.selfX = event.pageX;//鼠标点距离页面左边
        this.selfY = event.pageY;//鼠标点距离页面顶部
        this.x = event.pageX - rect.offsetLeft;
        this.y = event.pageY - rect.offsetTop;
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
    getNeedXY() {
        // // 四舍五入打出5的整数倍
        // return new Promise((resolve, rejected) => {
        //     Promise.all([new Promise((resolve, rejected) => {
        //         if (this.x % 10 >= 5) {
        //             resolve((Number.parseInt(this.x / 10) + 1) * 10);
        //             return;
        //         }
        //         if (this.x % 10 === 0) {
        //             resolve(this.x);
        //         }
        //         resolve((Number.parseInt(this.x / 10) * 10) + 5);
        //     }), new Promise((resolve, rejected) => {
        //         if (this.y % 10 >= 5) {
        //             resolve((Number.parseInt(this.y / 10) + 1) * 10);
        //             return;
        //         }
        //         if (this.y % 10 === 0) {
        //             resolve(this.y);
        //         }
        //         resolve((Number.parseInt(this.y / 10) * 10) + 5);
        //     })]).then(data => {
        //         resolve({
        //             x: data[0],
        //             y: data[1],
        //         });
        //     });
        // });
        const error = 15;
        const basic = 40;
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