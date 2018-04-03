import colors from '../rules/colors.js';
import uuid from '../tools/uuid.js';

export default(styleObj, className) => {
  const id = uuid(8);
  let o = [],
    j = 0;
  const isColor = /\w*\d0{1,2}/;
  const doit = (obj, name) => {
    for (let i in obj) {
      if (typeof o[j] !== 'object') 
        o[j] = {};
      if (typeof obj[i] !== 'object') {
        const colorArr = obj[i].match(/\w*\d0{1,2}/);
        if (colorArr instanceof Array) {
          colorArr.forEach((item) => {
            obj[i] = obj[i].replace(item, colors[item]);
          })
        }
        o[j][i] = obj[i]
        continue;
      } else {
        let n = name
          ? name + i
          : i;
        j++;
        o[j] = {
          key: n
        };
        doit(obj[i], n);
      }
    }
    return;
  };
  const trans = (className) => {
    let result = [];
    const itemFun = (rules) => {
      let s = '';
      for (let i in rules) {
        if (i === 'key') 
          continue;
        s = s + `${i}: ${rules[i]};`
      }
      return s;
    };
    o.forEach((item, i) => {
      if (i === 0) {
        result.push(`${className}{${itemFun(item)}}`)
      } else {
        result.push(`${className}${item.key}{${itemFun(item)}}`)
      }
    });
    return result.join('');
  }
  doit(styleObj)
  $('head').append(`<style id='${id}'>${trans(className)}</style>`)
  return id;
};