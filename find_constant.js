const fs = require('fs');
function decodeValue(base, value) {
    return parseInt(value, base);
}
function lagrangeInterpolation(points, k) {
    let c = 0;
    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= -xj / (xi - xj);
            }
        }
        c += yi * li;
    }
    return Math.round(c);
}
function findConstantTerm(filePath) {
    const inputData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const { n, k } = inputData.keys;
    const points = [];
    for (const key in inputData) {
        if (!isNaN(key)) {
            const x = parseInt(key);
            const { base, value } = inputData[key];
            const y = decodeValue(parseInt(base), value);
            points.push([x, y]);
        }
    }
    points.sort((a, b) => a[0] - b[0]);
    const selectedPoints = points.slice(0, k);
    const c = lagrangeInterpolation(selectedPoints, k);
    return c;
}
console.log("Constant term for test case 1:", findConstantTerm('testcase1.json'));
console.log("Constant term for test case 2:", findConstantTerm('testcase2.json'));
