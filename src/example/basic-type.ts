// 1. 布尔类型

// let bool: boolean = false
let bool: boolean
bool = true
// bool = 123    // Type 'number' is not assignable to type 'boolean'

// 2. 数值类型
let num: number = 123     // 十进制
num = 0b111011            // 二进制
num = 0o173               // 八进制
num = 0x7b                // 十六进制
num = NaN 

// 3. 字符串类型
let str: string
str = 'abc'
str = `数值是${num}`

// 4. 数组类型
let arr1: number[]  // 写法一
arr1 = [1, 2, 3]

let arr2: Array<number> // 写法二
// let arr3: [number | string]
// let arr3: (number | string)[]

// 5. 元组类型 -- 数组形式且必须按照类型顺序
let tuple: [string, number, boolean]

// 枚举类型 -- 只能用 const 不可以用 let 
// 枚举的值可以是数值, 初始位默认为 0, 后续值自动自增
// 如果是字符串, 每一项都需赋值操作
// 且在打包后, 枚举类型不会显示, 而是直接显示对应的值
const enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}

/**
 * var Roles
 * (function(Roles) {
 *  Roles[Roles['SUPER_ADMIN'] = 0] = 'SUPER_ADMIN'
 *  Roles[Roles['ADMIN'] = 1] = 'ADMIN'
 *  Roles[Roles['USER'] = 2] = 'USER'
 * })(Roles || (Roles = {}))
 */

const enum PostStatus {
  Draft = 6,
  UnPublished,       // 7
  Published          // 8
}

// console.log(Roles.SUPER_ADMIN, PostStatus.UnPublished)
// console.log(0 /* Roles.SUPER_ADMIN */, 7 /* PostStatus.UnPublished */);

// any 类型
let values: any

// void 类型 -- 什么类型都不是
const consoleText = (text: string):void => {
  console.log(text)
}
let v:void 
v = undefined
// v = null

// null和undefined -- 是其他类型的子类型
let u: undefined = void 0
let n: null = null

// never类型
// 抛错
const errorFunc = (message: string): never => {
  throw new Error(message)
}
// 死循环
const infiniteFunc = (): never => {
  while(true) {}
}

// object
function getObject(obj: Object): void {
  console.log(obj)
}

// 类型断言
const getLength = (target: string | number): number => {
  // 两种方式, 但可以看到每一次使用都要写一次, 非常繁琐
  // 在 jsx 中只能使用 as, 不能使用 <> 的方式(像一个标签)
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}