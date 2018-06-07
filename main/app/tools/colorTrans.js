import $ from 'jquery';
import colors from '../rules/colors.js';
import uuid from '../tools/uuid.js';

export default(styleObj, className) => {
  const id = uuid(8);
  const o = [];
  let j = 0;
  const isColor = /\w+\d0{1,2}/;
  const doit = (obj, name) => {
    for (const i in obj) {
      if (typeof o[j] !== 'object') { o[j] = {}; }
      if (typeof obj[i] !== 'object') {
        if (typeof obj[i] === 'string') {
          const colorArr = obj[i].match(/\w+\d0{1,2}/);
          if (colorArr instanceof Array) {
            colorArr.forEach((item) => {
              obj[i] = obj[i].replace(item, colors[item]);
            });
          }
        }
        o[j][i] = obj[i];
        continue;
      } else {
        const n = name
          ? name + i
          : i;
        j++;
        o[j] = {
          key: n,
        };
        doit(obj[i], n);
      }
    }
  };
  const trans = (className) => {
    const result = [];
    const itemFun = (rules) => {
      let s = '';
      for (const i in rules) {
        if (i === 'key') { continue; }
        s += `${i}: ${rules[i]};`;
      }
      return s;
    };
    o.forEach((item, i) => {
      if (i === 0) {
        result.push(`${className}{${itemFun(item)}}`);
      } else {
        result.push(`${className}${item.key}{${itemFun(item)}}`);
      }
    });
    return result.join('');
  };
  doit(styleObj);
  $('head').append(`<style id='${id}'>${trans(className)}</style>`);
  return id;
};
