/** this 类型 */
class CounterCls {
  constructor(public count: number = 0) {}
  
  add(value: number) {
    this.count += value
    return this
  }

  subtract(value: number) {
    this.count -= value
    return this
  }
}

let cnt = new CounterCls(10)
// 可以发现通过 return this返回实例 操作实现了链式操作(当然这是js本身就有的操作)
console.log(cnt.add(3).subtract(2))

class PowCounter extends CounterCls {
  constructor(count: number = 0) {
    super(count)
  }
  pow(value: number) {
    this.count = this.count ** value
    return this
  }
}

let powCnt = new PowCounter(2)
console.log(powCnt.pow(3).add(1).subtract(3))
console.log('---------------------------------------------------------------')

/** 索引类型 */

// keyof 查询操作符 --> 返回一个类型的所有属性名组成的联合类型
interface Infos {
  name: string;
  age: number;
}

let infoProp: keyof Infos
infoProp = 'name'
infoProp = 'age'
// infoProp = 'gender'
// Type '"gender"' is not assignable to type 'keyof Infos'


function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(n => obj[n])
}
const infoObj = {
  name: 'lison',
  age: 18
}
let infoValues: Array<string | number> = getValue(infoObj, ['name', 'age'])
console.log(infoValues)

// [] 索引访问操作符
type nameTypes = Infos['name']

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

interface Objs<T> {
  [key: number]: T
}
let objs: Objs<number> = { 0: 18 }
let keys: keyof Objs<string>

interface Type {
  a: never,
  b: never,
  c: string,
  d: number,
  e: undefined,
  f: null,
  g: object
}
type Test = Type[keyof Type]
// string | number | object | null | undefined 组成的联合类型
console.log('---------------------------------------------------------------')

/** 映射类型 */
interface Info1 {
  age: number,
  name: string,
  gender: string
}
type ReadonlyType<T> = {
  // for ... in
  +readonly [P in keyof T]?: T[P]
}
type ReadonlyInfo1 = ReadonlyType<Info1>
// type ReadonlyInfo1 = Readonly<Info1>
// type ReadonlyInfo1 = Partial<Info1>
let readonlyInfo1: ReadonlyInfo1 = {
  age: 18,
  name: 'lison',
  gender: '男'
}
// + - 增加和移除特定修饰符 
type RemoveReadonlyType<T> = {
  // for ... in
  -readonly [P in keyof T]-?: T[P]
}
type InfoWithoutReadonly = RemoveReadonlyType<ReadonlyInfo1>

// 这种需求比较普遍, 将所有属性转为只读 -- Readonly  可选 -- Partial (内置类型)
// Pick Record

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// }

interface Info2 {
  name: string,
  age: number,
  address: string
}

const pickInfo: Info2 = {
  name: 'lison',
  age: 18,
  address: 'peiking'
}

// 获取部分属性的一个新对象
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  let res: any = {}
  keys.map(key => res[key] = obj[key])
  return res
}
pick(pickInfo, ['age', 'address'])

// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

// 将属性值全部替换成新值
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  let res: any = {}

  for (const key in obj) {
    res[key] = f(obj[key])
  }

  return res
}

const names = { 0: 'hello', 1: 'world', 2: 'bye'}
const lengths = mapObject(names, s => s.length)
// function mapObject<0 | 1 | 2, string, number>(obj: Record<0 | 1 | 2, string>, f: (x: string) => number): Record<0 | 1 | 2, number>
console.log(lengths)

// 同态: 两个相同类型的代数结构之间的结构保持映射
// Readonly, Partial, Pick 是同态, Record 不是

// 映射类型的推断
type Proxy<T> = {
  get(): T,
  set(value: T): void
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

// 封包
function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value) => obj[key] = value
    }
  }
  return result
}

let props1 = {
  name: 'lison',
  age: 18
}
let proxyProps = proxify(props1)
console.log(proxyProps)
proxyProps.name.set('jack')
console.log(proxyProps.name.get())

// 拆包
function unproxify<T>(t: Proxify<T>): T {
  const result = {} as T
  for (const k in t) {
    result[k] = t[k].get()
  }
  return result
}

let originalProps = unproxify(proxyProps)
console.log(originalProps)

// keyof 和 symbol 2.9 版本的升级
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()

type Obj2 = {
  [stringIndex]: string,
  [numberIndex]: number,
  [symbolIndex]: symbol
}

type keystype = keyof Obj2
type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P]
}
let obj3: ReadonlyType<Obj2> = {
  a: 'aa',
  1: 11,
  [symbolIndex]: Symbol()
}

// TypeScript 3.1，在元组和数组上的映射对象类型现在会生成新的元组/数组
// 而非创建一个新的类型,并且这个类型上具有如push()，pop()和length这样的成员
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}
type Tuple = [number, string, boolean]
// 元组或者数组，其实也是对下标 0, 1, 2 的变相处理成一个数组了
type PromiseTuple = MapToPromise<Tuple>

let tuple1: PromiseTuple = [
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve('a')),
  new Promise(resolve => resolve(true))
]
console.log('---------------------------------------------------------------')

/** unknow */
// [1] 任何类型都可以赋值给 unknow 类型
let value1: unknown
value1 = 'a'
value1 = 123

// [2] 如果没有类型断言或基于控制流的类型细化时, unknow不可以赋值给其他类型, 此时只能赋值给 unknow 和 any 类型
// let value2: string = value1
// Type 'unknown' is not assignable to type 'string'
let value2: unknown = value1

// [3] 如果没有类型断言或基于控制流的类型细化, 不能对其做任意操作
// let value3: unknown
// value3 += 1

// [4] unknow与任何其他类型组成的交叉类型最后都等于其他类型
type type1 = string & unknown   // string
type type2 = number & unknown   // number
type type3 = unknown & unknown  // unknow

// [5] unknow与任何其他类型(除 any)的组成的联合类型都为 unknow 类型
type type4 = string | unknown // unknow
type type5 = any | unknown    // any

// [6] never 类型是 unknow 的子类型
type type6 = never extends unknown ? true : false   // 条件类型距离  --> true

// [7] keyof unknow 等于类型 never
type type7 = keyof unknown    // never

// [8] 只能对 unknow 进行等或不等操作, 不能进行其他操作
value1 === value2

// [9] unknow 类型的值不能访问它的属性，不能作为函数调用和作为类创建实例
// [10] 使用映射类型，如果遍历的是unknow类型，则不会映射任何属性
type Type1<T> = {
  [P in keyof T]: number
}
type type8 = Type1<any>
type type9 = Type1<unknown>
console.log('---------------------------------------------------------------')

/** (分布式)条件类型 */
// T extends U? X: Y
type Type2<T> = T extends string? string: number
let index: Type2<'a'>       // 此时的 'a' 是字符串的字面量类型

// type TypeName<T> = T extends any? T: never
// type Type3 = TypeName<string | number>

type TypeName<T> = 
  T extends string? string:
  T extends number? number:
  T extends boolean? boolean:
  T extends undefined? undefined:
  T extends Function? Function: object

type type10 = TypeName<string[]>

type Diff<T, U> = T extends U? never: T
type Test2 = Diff<string|number|boolean, undefined|number>    // string | boolean

// 这个例子 ----  [keyof T] 遍历出属性值不为 never 的属性名(额，这个写法...)
type Type3<T> = {
  [K in keyof T]: T[K] extends Function? K: never
}[keyof T]
interface Part {
  id: number,
  name: string,
  subparts: Part[],
  undatePart(newName: string): void
}
type Test3 = Type3<Part>

// infer 条件类型推断
type Type4<T> = T extends any[]? T[number]: T     // 如果是数组取数组元素类型否则直接是传入类型
type Test4 = Type4<string[]>
type Test5 = Type4<string>

type Type5<T> = T extends Array<infer U>? U: T
type Test6 = Type5<string[]>

// Exclude<T, U>  从U中选出不在T中的类型，返回一个联合类型
type Type6 = Exclude<'a'|'b'|'c', 'b'>      // type Type6 = 'a' | 'c'
// Extract<T, U>  从T中选取出可以赋值给U的类型
type Type7 = Extract<'a'| 'b' | 'c', 'c' | 'b'>   // type Type7 = 'a' | 'c'

// NonNullable<T> 去除 null 和 undefined
type Type8 = NonNullable<string | number | null | undefined>

// ReturnType 获取函数类型返回值类型
type Type9 = ReturnType<() => string>
type Type10 = ReturnType<() => void>

// InstanceType 获取构造函数的实例类型
class ACls {
  constructor() {}
}
type T1 = InstanceType<typeof ACls>
type T2 = InstanceType<any>
type T3 = InstanceType<never>
// type T4 = InstanceType<string>
