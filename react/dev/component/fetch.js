import 'whatwg-fetch';
import 'es6-promise';
import { message } from 'antd';

const Promise = require('es6-promise').Promise;

if (!window.Promise) {
    window.Promise = Promise;
}
export const handelForm = param => {
    let group = '';
    for (const par in param) {
        group += group.includes('&') ? `&${par}=${param[par]}` : `${par}=${param[par]}`;
    }
    return group;
};

export default class Fetch {
    static remote(url, config, success, error) {
        const defaultConfig = {
            method: 'GET',
        };
        const newConfig = Object.assign({}, defaultConfig, config);
        fetch(url, newConfig).then(response => response.json()).then(data => {
            if (data.success) {
                success(data);
            } else {
                message.destroy();
                message.error(data.msg);
                error();
            }
        }).catch(e => {
            message.error(e);
            error();
        });
    }

    static get(url, config = {}) {
        let urls = url;
        const params = { access_token: sessionStorage.token };
        urls = `${url}?${handelForm(Object.assign({}, config, params))}`;
        return new Promise((resolve, reject) => {
            const newConfig = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
            };
            Fetch.remote(urls, newConfig, resolve, reject);
        });
    }

    static post(url, config = {}) {
        // console.log(config);
        return new Promise((resolve, reject) => {
            let defaultConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
            };
            const params = { access_token: sessionStorage.token };
            const body = { body: typeof config === 'object' ? handelForm(Object.assign({}, config, params)) : config };
            defaultConfig = Object.assign({}, defaultConfig, body);
            Fetch.remote(url, defaultConfig, resolve, reject);
        });
    }

    static del(url, config) {
        let urls = url;
        const params = { access_token: sessionStorage.token };
        if (config) {
            urls = `${url}?${handelForm(Object.assign({}, config, params))}`;
        }
        return new Promise((resolve, reject) => {
            const defaultConfig = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
            };
            Fetch.remote(urls, defaultConfig, resolve, reject);
        });
    }

    static put(url, data) {
        let urls = url;
        const params = { access_token: sessionStorage.token };
        if (data) {
            urls = `${url}?${handelForm(Object.assign({}, data, params))}`;
        }
        return new Promise((resolve, reject) => {
            const newConfig = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',
            };
            Fetch.remote(urls, newConfig, resolve, reject);
        });
    }
    static postJSON(url, data) {
        return new Promise((resolve, reject) => {
            const params = { access_token: sessionStorage.token };
            const newConfig = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(Object.assign({}, data, params)),
            };
            Fetch.remote(url, newConfig, resolve, reject);
        });
    }
}

