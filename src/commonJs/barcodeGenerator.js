function barcodeGenerator() {
    let str = "",
        range = 32,
        charStr = 'abcdef0123456789';

    for (let i = 0; i < range; i++) {
        let index = Math.round(Math.random() * (charStr.length - 1));
        str += charStr.substring(index, index + 1);
    }
    let returnStr = str.substring(0, 8) + "-" + str.substring(8, 12) + "-" + str.substring(12, 16) + "-" + str.substring(16, 20) + "-" + str.substring(20, 32)
    return returnStr;
}

export default barcodeGenerator