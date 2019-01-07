/**created by panchong on 2018/11/29**/
const xlsx = require('node-xlsx');
const { fromJS } = require('immutable');
const fs = require('fs');

const sheets = xlsx.parse('./testExcel.xlsx');//获取到所有sheets
let result = [];
sheets.forEach(function(sheet){
    // console.log(JSON.stringify(sheet));
    for(var rowId in sheet['data']){
        // console.log(rowId);
        var row=sheet['data'][rowId];
        // console.log(row);
        if (row[1].endsWith('0000')) { //找出省
            result.push({p: row[0], code: row[1], c: []});
            // result.push({p: row[0], c: []});
        }
        const defaultCity = ['11', '12', '31', '50', '71', '81', '82'];
        if ((row[1].endsWith('00') && !defaultCity.includes(row[1].substr(0, 2)) && !row[1].endsWith('0000')) || (!row[1].endsWith('00') && defaultCity.includes(row[1].substr(0, 2)) && !row[1].endsWith('0000'))) { //找出市
            const proIndex = result.findIndex(item => item.code.substr(0, 2) === row[1].substr(0, 2));
            const province = fromJS(result).get(proIndex);
            const city = province.get('c');
            // const newCity = city.set(city.size, {
            //     n: row[0],
            //     code: row[1],
            // });
            const newCity = city.set(city.size, {
                n: row[0],
            });
            const newPro = province.set('c', newCity);
            result = fromJS(result).set(proIndex, newPro).toJS();
        }
    }
});
// const oldProvince = require('./testOldexcel.js');
//
// oldProvince.forEach(item => {
//     const proIndex = result.findIndex(obj => obj.p1.includes(item.p));
//     const pro = fromJS(result).get(proIndex);
//     const oldCitys = item.c;
//     let newPro = pro.set('p2', item.p);
//     const citys = pro.get('c').toJS();
//     if (item.c) {
//         oldCitys.forEach(ci => {
//             const cityIndex = citys.findIndex(obj => obj.n1.includes(ci.n) || obj.n1 === ci.n);
//             if (cityIndex >= 0) {
//                 const newCity = fromJS(citys).set(cityIndex, fromJS(citys).get(cityIndex).set('n2', ci.n));
//                 newPro = pro.set('c', newCity);
//             }
//         });
//     }
//     result = fromJS(result).set(proIndex, newPro).toJS();
// });
fs.writeFileSync('testexcel.js', `module.exports = ${JSON.stringify(result)}`);
console.log('导出完毕');
// console.log(oldList);
