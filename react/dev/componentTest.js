/**created by panchong on 2018/1/16**/
import React from 'react';
import QRCode from 'qrcode.react';
import $ from 'jquery';
import Header from './header';
import Promise from 'es6-promise';
import API_URL from './component/url';
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
        // $.ajax({
        //     url: 'http://developer.hanvon.com/formula/handrecg.do?uuid=f8232c28-6648-45a7-f7ae-56ee8f17fbd0&traceStr=104%2C53%2C94%2C50%2C86%2C50%2C77%2C50%2C71%2C53%2C65%2C63%2C61%2C76%2C61%2C91%2C64%2C109%2C72%2C119%2C78%2C123%2C86%2C125%2C94%2C125%2C101%2C118%2C106%2C107%2C108%2C97%2C108%2C92%2C108%2C86%2C108%2C81%2C106%2C75%2C105%2C66%2C103%2C60%2C103%2C58%2C103%2C56%2C102%2C56%2C105%2C64%2C109%2C75%2C114%2C84%2C118%2C90%2C126%2C97%2C140%2C106%2C151%2C112%2C158%2C115%2C160%2C115%2C160%2C115%2C-1%2C0%2C185%2C78%2C196%2C78%2C212%2C78%2C228%2C78%2C238%2C77%2C243%2C77%2C248%2C76%2C256%2C74%2C258%2C74%2C-1%2C0%2C215%2C55%2C-1%2C0%2C219%2C108%2C-1%2C0%2C311%2C27%2C311%2C31%2C311%2C35%2C311%2C39%2C311%2C48%2C312%2C67%2C314%2C81%2C316%2C91%2C316%2C96%2C316%2C100%2C316%2C108%2C316%2C113%2C316%2C113%2C316%2C104%2C316%2C86%2C317%2C73%2C317%2C66%2C317%2C64%2C319%2C62%2C326%2C59%2C336%2C57%2C344%2C57%2C349%2C57%2C352%2C59%2C354%2C68%2C356%2C81%2C356%2C87%2C354%2C94%2C350%2C99%2C345%2C104%2C339%2C107%2C332%2C110%2C328%2C112%2C326%2C112%2C325%2C113%2C323%2C113%2C323%2C113%2C-1%2C0%2C421%2C66%2C426%2C66%2C433%2C66%2C441%2C66%2C444%2C66%2C445%2C66%2C-1%2C0%2C422%2C94%2C426%2C94%2C434%2C94%2C440%2C95%2C442%2C95%2C445%2C95%2C446%2C95%2C448%2C95%2C450%2C95%2C451%2C95%2C-1%2C0%2C546%2C62%2C541%2C62%2C529%2C62%2C520%2C65%2C512%2C72%2C504%2C81%2C499%2C90%2C497%2C103%2C501%2C123%2C517%2C140%2C539%2C147%2C569%2C150%2C587%2C147%2C600%2C141%2C604%2C137%2C605%2C137%2C-1%2C0%2C',
        //     success: data => {
        //         console.log(data);
        //         this.setState({
        //             hanwang: daa.formulas[0],
        //         })
        //     },
        // });
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
                记录坐标：
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