/**1. 唯一性
 */

const s1 = Symbol()
const s2 = Symbol()

// this condition will always return 'false' since the types 'typeof s1' and 'typeof s2' have no overlap ts(2367)
// console.log(s1 == s2)

// 可以传入参数, 传入的参数会经过 toString() 方法处理
// 同样参数的 Symbol 值也时不相同的

const s = Symbol('pipe')
console.log('---------------------------------------------------------------')

/**2. 运算
 */
// 1 + s  -->  Symbol 不可以进行运算
// Operator '+' cannot be applied to types 'number' and 'unique symbol'

s.toString()   // --> 'Symbol(pipe)'
Boolean(s)     // --> true
console.log('---------------------------------------------------------------')

/**3. 作属性
 */
// Symbol 作为属性名
const obj = {
  [s]: '3km',
  pipe: '3km'
}
obj[s]              // 获取
console.log('---------------------------------------------------------------')

/**4. 属性获取
 * 
 *  无效获取
 *   + for in
 *   + Object.keys()/Object.entries
 *   + Object.getOwnPropertyNames()
 *   + JSON.stringify()
 * 
 *  获取方式
 *   + Object.getOwnPropertySymbols()
 *   + Relect.ownKeys()
 */
console.log('---------------------------------------------------------------')

/**5. Symbol.for()  Symbok.keyFor()
 * // 全局范围: 当前页面、iframe, service worker
 */
const symbol1 = Symbol.for('moon')
const symbol2 = Symbol.for('moon')

// console.log(symbol1 == symbol2)   // 应该为true, ts这里判定为 false 不知为何

/** 一些内置的 */