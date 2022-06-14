/**1. 标准形式
 */

interface NameInfo {
  firstName: string,
  lastName: string
}

// const getFullName = ({firstName, lastName}: { firstName: string, lastName: string }) => {
const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName}, ${lastName}`
}

getFullName({
  firstName: 'Hua',
  lastName: 'Li'
})
console.log('---------------------------------------------------------------')

/**2. 可选属性、只读属性
 * 
 */
interface Vegetable {
  color?: string,
  readonly type: string
}
const getVegetables = ({ color, type }: Vegetable): string => {
  return `${color ? color + ' ': ''}${type}`
}

getVegetables({ type: 'tomato' })

// 可以看到在多传入属性情况下，虽不影响逻辑，但也会报错
/** 
 * 1. 可以使用类型断言, 明确告知编译器传入类型
 * getVegetables({ type: 'tomato', size: '1' } as vegetable)
*/
/** 
 * 2. 利用索引签名 
 * 
 * interface Vegetable {
 *  color?: string,
 *  type: string,
 *  [prop: string]: any
 * }
*/
/**
 * 3. 类型兼容性，通过变量的方式传入, 保证应该存在的类型存在即可，多余类型不管
 * const vegetavleInfo = {
 *  type: 'tomato',
 *  size: 1
 * }
 * 
 * getVegetable(vegetavleInfo)
 */

const vegetavleInfo: Vegetable = {
  type: 'tomato'
}

// Cannot assign to 'type' because it is a read-only property.ts(2540)
// vegetavleInfo.type = 'carrot'
console.log('---------------------------------------------------------------')

/**3. 还可以用于函数, 建议使用 type 
 */
interface AddFunc {
  (num1: number, num2: number): number
}
// type AddFunc = (num1: number, num2: number) => number
// const add: AddFunc = (num1, num2) => num1 + num2
console.log('---------------------------------------------------------------')

/**4. 索引类型 */
interface RoleDic {
  [id: string]: string
}
const role: RoleDic = { 0: 'SUPER_ADMIN' }
console.log('---------------------------------------------------------------')

/**5 接口的继承 */
interface Tomato extends Vegetable {
  radius: number
}
const tomato: Tomato = {
  type: 'tomato',
  radius: 2
}
console.log('---------------------------------------------------------------')

/**6. 混合类型接口 -- 就我个人还没有看出意义所在 */
interface Counter {
  (): void,
  count: number
}

const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}
const counter: Counter = getCounter()