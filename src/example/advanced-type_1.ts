/** & 交叉类型 */
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U
  res = Object.assign(arg1, arg2)
  return res
}

merge({ a: 'a' }, { b: 'b' })
console.log('---------------------------------------------------------------')

/** | 联合类型 */ 
const getLen = (content: number | string): number => {
  if (typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}

getLen('123')
getLen(123)
console.log('---------------------------------------------------------------')

/** 类型保护  */
const getRandom = () => {
  const values = ['abc', 123]
  const number = Math.random() * 10
  return number < 5? values[0]: values[1]
}
const random = getRandom()
if ((random as string).length) {
  console.log((random as string).length)
} else {
  console.log((random as number).toFixed())
}

// 用 is 关键字指定类型
const isString = (value: number| string): value is string => {
  return typeof value === 'string'
}
if (isString(random)) {
  console.log(random.length)
} else {
  console.log(random.toFixed())
}

// 使用 typeof 做类型保护, 1.只能使用 等号或者不等号  2.string/number/boolean/symbol 这四种之一比较
if (typeof random === 'string') {
  console.log(random.length)
} else {
  console.log(random.toFixed())
}

// instanceof 做类型保护
class CreatClass1 {
  constructor(public name: string) {}
}
class CreatClass2 {
  constructor(public age: number) {}
}
function getRandomClass() {
  return Math.random() * 10 < 5 ? new CreatClass1('Li'): new CreatClass2(17)
}
const randomClass = getRandomClass()
if (randomClass instanceof CreatClass1) {
  console.log(randomClass.name)
} else {
  console.log(randomClass.age)
}
console.log('---------------------------------------------------------------')

/** null 和 undefined -- 任何类型的子类型 */
// string | undefined  string | null  string | undefined | null

// (parameter) num: number | undefined
function Unde_Num(num?: number): void {}

const getLenFuc = (value: string | null): number => {
  return (value || '').length
}

const getSpliceString = (num: number | null): string => {
  function getPrefix(prefix: string) {
    // 对于确定不为 null 的变量后面可以添加 !
    return prefix = num!.toFixed().toString()
  }
  num = num || 0.1
  return getPrefix('lison')
}
console.log('---------------------------------------------------------------')

/** 类型别名 */
type TypeString = string
type PositionType<T> = { x: T, y: T }  // 接口会更好
let postion: PositionType<number> = { x: 1, y: 2 }

type Child<T> = {
  current: T,
  child?: Child<T>        // 对象属性中引用类型别名自己, 形成了一个嵌套结构
}
let child: Child<number> = { 
  current: 0, 
  child: {
    current: 1,
    child: {
      current: 2
    }
  }
}
console.log('---------------------------------------------------------------')

/** 字面量类型 */
type Direction = 'north' | 'south' | 'west' | 'east'

function getDirectionFirst(direction: Direction): string {
  return direction[0]
}
getDirectionFirst('north')

/** 枚举类型 */
console.log('---------------------------------------------------------------')

/** 可辨识联合 */
// 1. 具有普通的单例类型属性
// 2. 一个类型别名包含了哪些类型的联合

interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  height: number,
  width: number
}
interface Circle {
  kind: 'circle',
  raduis: number
}
type Shape = Square | Rectangle | Circle
function assertValue(value: never): never {
  throw new Error('Unexecpted' + value)
}

function getArea(s: Shape) {
  switch(s.kind) {
    case 'square': return s.size ** 2
    case 'rectangle': return s.height * s.width
    case 'circle': return Math.PI * s.raduis ** 2
    
    // 当不指定返回值，通过 default 调用 never 的方式, 能告知缺失考虑的信息
    // default: assertValue(s)
    // Argument of type 'Circle' is not assignable to parameter of type 'never'

    // getArea 返回值不指定时，缺少 circle 条件判断时, 返回值类型为 number | undefined
    // 如果特指 返回值类型为 number 时, 则会报一下错误
    // case 'circle': return Math.PI * s.raduis ** 2
    // Function lacks ending return statement and return type does not include 'undefined'
  }
}

// 完整性检查
// strictNullChecks
// 使用 never 类型