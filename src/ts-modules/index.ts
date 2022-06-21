// import { name } from './b'
// import { name as nameProp } from './b'
// import * as info from './b'

// import * as AData from './a'
// console.log(AData)

// import name = require('./c')

/// <reference path="./letter-validation.ts" />
/// <reference path="./number-validation.ts" />
// tsc --outFile src/index.js src/ts-modules/index.ts 
let isLetter = Validation.checkLetter('abc')
let isNumber = Validation.checkNumber(123)

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire {}
  }
}

import polygons = Shapes.Polygons   // 单纯是为了起别名, 非引入
let triagnle = new polygons.Triangle()

// 相对导入  / 根目录  ./ 当前目录  ../ 上一级目录