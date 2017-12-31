/** created by panchong on 2017/12/6* */
/*
@type 上传方式 button点击按钮上传 itself点击自己上传后文件也展示在当前区域如点击区域内上传图片情况
@param accept 上传文件格式 必需
@className 上传区样式class
@param action 文件要上传的地址 必需
@param data 文件上传所需参数 非必需
@param fileSize 上传文件大小 非必需
@param handleProgress 正在上传状态回调 true 正在上传中 false 上传结束 非必需
@param onChangeUrl 上传结束回调 只返回文件的url 非必需
@param onChangeObj 上传结束回调 返回Upload组件上传成功后的完整数据对象info 非必需
*/

import React from 'react';
import { Upload, message } from 'antd';
import moment from 'moment';

const defaultImage = 'images/defaultImage.png';
export default class UploadFile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            src: props.src,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.state = {
            src: nextProps.src,
        };
    }
    handleProgress(status) {
        if (this.props.onProgress) {
            this.props.onProgress(status);
            return;
        }
    }
    handleChange(info) {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.handleProgress(true);
        }
        if (info.file.status === 'done') {
            this.handleProgress(false);
            message.success('上传成功！');
            if (this.props.onChangeUrl) {
                this.props.onChangeUrl(info.file.response.url);
            }
            if (this.props.onChangeObj) {
                this.props.onChangeObj(info);
            }
        } else if (info.file.status === 'error') {
            message.error('操作失败！');
            this.handleProgress(false);
        }
    }
    render() {
        const fileSize = this.props.fileSize;
        const importSet = {
            name: 'file',
            action: "//jsonplaceholder.typicode.com/posts/",
            // action: this.props.action,
            data: this.props.data ? this.props.data : {},
            headers: {
                authorization: sessionStorage.token,
            },
            showUploadList: false,
            accept: this.props.accept,
            onChange: info => {
                this.handleChange(info);
            },
            beforeUpload: file => {
                const isLt1M = file.size < parseInt(fileSize) * 1024 * 1024;
                if (!isLt1M) {
                    message.error(`文件大小不能超过${fileSize}MB!`);
                }
                return isLt1M;
            },
        };
        if (this.props.type === 'button') {
            return (
                <Upload {...importSet}>
                    {this.props.children}
                </Upload>
            );
        }
        if (this.props.type === 'itself') {
            return (
                <Upload {...importSet}>
                    <img alt="" src={this.state.src ? `${this.state.src}?k=${moment().format('X')}` : defaultImage} className={this.props.className} />
                </Upload>
            );
        }
    }
}
