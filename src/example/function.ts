/**
 * function add(arg1: number, arg2: number): number {
 *  return arg1 + arg2
 * }
 * 
 * const add = (arg1: number, arg2: number): number => arg1 + arg2
 */

let add: (x: number, y: number) => number
add = (arg1: number, arg2: number): number => arg1 + arg2
add = (arg1: number, arg2: number) => arg1 + arg2

interface Add {
  (x: number, y: number): number
}

// type 作用就是起别名 type variable = express
type isString = string

let addFunc: Add = add
console.log('---------------------------------------------------------------')

/** 可选参数 */
type MutiAdd = (arg1: number, arg2: number, arg3?: number) => number
let mutiAddFunc: MutiAdd 
mutiAddFunc = (x: number, y: number) => x + y
// mutiAddFunc = (x: number, y: number, z: number) => x + y + z    // "strictNullChecks": false

type Decs = (arg1: number, arg2?: number) => number
// 函数中的 y: number = 3 可以直接写成 y = 3, 因为会自动根据 3 推断 y 应该是 number
let desc: Decs = (x: number, y: number = 3) => x - y
console.log('---------------------------------------------------------------')

/** 剩余参数 */
const handleData = (arg1: number, ...args: string[]) => {
  // ...
}
console.log('---------------------------------------------------------------')

/** 重载 -- 目前仅限于这种写法 */
function overload (x: string): string[]
function overload (x: number): number[]
function overload (x: any): any {
  if (typeof x === 'string') {
    return x.split('')
  } else if (typeof x === 'number') {
    return x.toString().split('').map(item => Number(item))
  }
}
overload('123')
overload(123)