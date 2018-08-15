class Utils {
    constructor() {
        this.isEquation =  /^(-?)(?:(\d+)(\+|\-){1})*(\d+)?$/;
        this.calculateFromString = this.calculateFromString.bind(this);
    }

    calculateFromString(str) {
        // if str is not String
        if(typeof str !== typeof '') {
            str = str.toString();
        }
        // if the string is not the equation format, then throw error
        if(!this.isEquation.test(str)) {
            throw new Error('unexpected string');
        }
        // calculate the string, now only support plus(+) and minus(-) operator
        //initial the stack
        const res = [''];

        //process str, if the last character is '-' or '+', then del
        if(str[str.length - 1] === '-' || str[str.length - 1] === '+') {
            str += '0';
        }
        // push the number(string) and operator to the stack
        for(let i = 0; i < str.length; i++) {
           if(str[i] === '-' || str[i] === '+') {
               res.push(str[i]);
           } else {
               let prevValue = res.pop();
               res.push(prevValue + str[i]);
           }
        }
        return res.reduce((prev, cur) => prev + +cur,0);
        // console.log(res);
    }
}

export default new Utils();