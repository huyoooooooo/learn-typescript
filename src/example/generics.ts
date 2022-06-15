// 函数后名后, 括号之前
const getArray = <T>(value: T, times: number = 5): T[] => {
  return Array(times).fill(value)
}
getArray<number>(2)

// 拆开来写
let getArray1: <T>(value: T, times?: number) => T[]
getArray1 = (value: any, times = 5) => {
 return Array(times).fill(value)
}
getArray1(2)
console.log('---------------------------------------------------------------')

// interface 来写
interface getArray2{
  <T>(arg: T, times?: number): T[]
}
const getArray2: getArray2 = (value: any, times = 5) => {
  return Array(times).fill(value)
}
getArray2(2)

interface getArray3<T> {
  (arg: T, times?: number): T[]
}
const getArray3: getArray3<number> = (value, times = 5) => {
  return Array(times).fill(value)
}
getArray3(2)
console.log('---------------------------------------------------------------')

// 多个泛型
const getTuple = <T, U>(param1: T, params2: U): [T, U] => {
  return [param1, params2]
}
// getTuple<number, string>(2, '3')
// 在实际调用函数时可以不写泛型参数, ts会自动进行类型判断
getTuple(2, '3')
console.log('---------------------------------------------------------------')

// 泛型约束
interface ValueHasLength {
  length: number
}
// 规定传入的 value 必须具有长度属性 使用 extends 继承
const getArray4 = <T extends ValueHasLength>(value: T, times: number = 5): T[] => {
  return Array(times).fill(value)
}
getArray4('123')
getArray4([1, 2, 3])
getArray4({
  length: 5
})
// getArray4(123)
// Argument of type 'number' is not assignable to parameter of type 'ValueHasLength'.ts(2345)

// keyof T 是 T 类型的键集, 此时的 K 是联合类型
const getProps = <T, K extends keyof T>(object: T, propName: K) => {
  return object[propName]
}
const props = {
  a: 'a',
  b: 'b'
}
getProps(props, 'a')
// getProps(props, 'c')
// Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.ts(2345)