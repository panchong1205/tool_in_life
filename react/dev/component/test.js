/**created by panchong on 2018/1/16**/
import React from 'react';
import QRCode from 'qrcode.react';
import Header from '../header';

export default class ComponentTest extends React.Component{
    handleDownload = () => {
        const canvas = document.getElementsByTagName('canvas')[0];
        const aLink = document.getElementById('code1');
        const MIME_TYPE = "image/png";
        aLink.download = '23.png';
        aLink.href = canvas.toDataURL("image/png");
        aLink.dataset.downloadurl = [MIME_TYPE, aLink.href].join(':');
    };
    render() {
        return <div>
            <Header keys={['5']} />
            <p>二维码测试</p>
            <QRCode
                value="aaaaaaaaa"
            />
            <a id="code1" onClick={this.handleDownload}>
                下载二维码
            </a>
        </div>
    }
}