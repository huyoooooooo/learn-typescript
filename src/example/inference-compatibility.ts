// 右 --> 左
let firstName = 'Json'

let arr = [1, '2']
// arr = [1, '2', false]
// Type 'boolean' is not assignable to type 'string | number'

// 左 --> 右
window.onmousedown = (mouseEvent) => {
  console.log(mouseEvent)
}
console.log('---------------------------------------------------------------')

// 兼容性 -- 递归深度
interface info {
  name: string
}
let infos: info
const info1 = { name: 'lison' }
const info2 = { age: 18 }
const info3 = { name: 'lison', age: 18 }
 
infos = info1
// infos = info2
// Property 'name' is missing in type '{ age: number; }' but required in type 'info'
infos = info3
console.log('---------------------------------------------------------------')

// 参数数量
let x = (a: number) => 0
let y = (b: number, c: string) => 0

y = x       // 参数多的可以兼容参数少的
// x = y    // 反之不可以
// Type '(b: number, c: string) => number' is not assignable to type '(a: number) => number'.ts(2322)


/** 上述例子的实际表现为下
 * let arr = [1, 2, 3]
 * arr.forEach((item, index, array) => { console.log(item) })
 * arr.forEach(item => { console.log(item) })
 */

// 参数类型
let x1 = (a: number) => 0
let y1 = (b: string) => 0
// x1 = y1  不可以    // 参数类型不同不兼容

// 可选参数和剩余参数
let getSum = (arr: number[], callback: (...args: number[]) => number): number => {
  return callback(...arr)
}
getSum([1, 2, 3], (arg1: number, arg2: number, arg3: number): number => {
  return arg1 + arg2 + arg3
})
getSum([1, 2, 3], (...args: number[]): number => {
  return args.reduce((prev, next) => prev + next, 0)
})

// 函数参数双向协变
let funA = (arg: number | string): void => {}
let funB = (arg: number): void => {}

// funA = funB  配置严格下不可以, 不严格则可以
funB = funA

// 返回值类型
let funC = (): string| number => 0
let funD = (): string => '0'

funC = funD     // 返回值类型多的兼容返回值类型少的
// funD = funC

// 函数重载
console.log('---------------------------------------------------------------')

enum A {
  A,
  B
}

enum B {
  C,
  D
}

let enumValue = A.A
// enumValue = B.C   // 尽管值都为 0，但是不同枚举之间不兼容
// Type 'B.C' is not assignable to type 'A'
console.log('---------------------------------------------------------------')

class AnimalClass {
  public static age: number
  constructor(public name: string) {}
}
class PeopleClass {
  public static age: string
  constructor(public name: string) {}
}
class FoodClass {
  constructor(public name: number) {}
}
let animal: AnimalClass
let people: PeopleClass
let food: FoodClass

// animal = people    不会检测类的静态成员. 检测实例成员。所以兼容
// animal = food      
console.log('---------------------------------------------------------------')

interface AClass<T> {
  data: T
}
interface BClass<T> {
  data: T
}
let Ac: AClass<number>
let Bc: BClass<string>

// Ac = Bc   不兼容