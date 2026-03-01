// Plot 5 is currently defined as facing: 'East'
let fs = require('fs');
let code = fs.readFileSync('src/data/plotCoordinates.js', 'utf8');

let p5 = code.match(/plotNumber:\ 5,.*?\n/)[0];
console.log('Plot 5 before:', p5);

let newCode = code.replace(
    /plotNumber: 5, x: 594, y: 537, w: PW, h: 60, lengthFt: 70, widthFt: 42, facing: 'East',/,
    "plotNumber: 5, x: 594, y: 537, w: PW, h: 60, lengthFt: 70, widthFt: 42, facing: 'West',"
);

if (newCode !== code) {
    fs.writeFileSync('src/data/plotCoordinates.js', newCode);
    console.log('Successfully updated Plot 5 facing to West.');
} else {
    console.log('No change to Plot 5 could be made. Pattern might be wrong.');
}

