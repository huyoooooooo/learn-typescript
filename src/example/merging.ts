interface InfoInter {
  name: string
  getRes(input: string): number
}
interface InfoInter {
  age: number
  getRes(input: number): string
}
// 接口合并
// 多个同名接口定义的非函数成员命名应该不重复, 如果重复则类型要求一致
// 每个同名函数成员都会被当成重载，且合并后面的接口具有更高优先级
let infoInter: InfoInter

infoInter = {
  name: 'lison',
  age: 18,
  getRes(text: any): any {
    if (typeof text === 'string') return text.length
    if (typeof text === 'number') return text.toString()
  }
}

// 同名的命名空间会将多个命名空间导出的内容进行合并  letter-validation & number-validation
/* 
  命名空间注意点
    /// <refrence path="相对路径" /> 自封闭标签
    命名空间相当于一个模块，需要导出的内容在内部通过 export 进行导出
*/

// 命名空间和类合并, 同名的类必须要在命名空间之前, 命名空间导出的内容静态挂在到类上
class Validations {
  constructor() {}
  checkType() {}
}
namespace Validations {
  export const numReg = /^[0-9]+$/
}
console.log(Validations)

// 命名空间和函数合并, 函数的定义在命名空间之前
function CountUp() {
  CountUp.count++
}
namespace CountUp {
  export let count  = 1
}
console.log(CountUp)

// 命名空间和枚举合并，为枚举拓展内容, 没有顺序要求
enum Colors {
  red,
  green,
  blue
}
namespace Colors {
  export const yellow = 3
}