var Validation;
(function (Validation) {
    Validation.isLetterReg = /^[A-Za-z]$/;
    Validation.checkLetter = function (text) {
        return Validation.isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    Validation.isNumberReg = /^[0-9]$/;
    Validation.checkNumber = function (text) {
        return Validation.isNumberReg.test(text);
    };
})(Validation || (Validation = {}));
// import { name } from './b'
// import { name as nameProp } from './b'
// import * as info from './b'
// import * as AData from './a'
// console.log(AData)
// import name = require('./c')
/// <reference path="./letter-validation.ts" />
/// <reference path="./number-validation.ts" />
var isLetter = Validation.checkLetter('abc');
var isNumber = Validation.checkNumber(123);
var Shapes;
(function (Shapes) {
    var Polygons;
    (function (Polygons) {
        var Triangle = /** @class */ (function () {
            function Triangle() {
            }
            return Triangle;
        }());
        Polygons.Triangle = Triangle;
        var Squaire = /** @class */ (function () {
            function Squaire() {
            }
            return Squaire;
        }());
        Polygons.Squaire = Squaire;
    })(Polygons = Shapes.Polygons || (Shapes.Polygons = {}));
})(Shapes || (Shapes = {}));
var polygons = Shapes.Polygons; // 单纯是为了起别名, 非引入
var triagnle = new polygons.Triangle();
// 相对导入  / 根目录  ./ 当前目录  ../ 上一级目录
