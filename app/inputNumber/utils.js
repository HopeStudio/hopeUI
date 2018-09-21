/* eslint-disable */
class Utils {

    range(value, min = -Infinity, max = Infinity) {
        return value > max ? max : (value < min ? min : value);
    }

    isEquation(str) {
        return /^(-?)(?:(\d+)(\+|\-){1})*(\d+)?$/.test(str);
    }
}

export default new Utils();