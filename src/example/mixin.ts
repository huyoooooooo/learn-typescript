// 混入：把两个对象或者类的内容混合到一起，从而实现一些功能的复用

interface ObjectA {
  a: string
}
interface ObjectB {
  b: string
}
let Aa: ObjectA = { a: 'a' }
let Bb: ObjectB = { b: 'b' }

let AB = Object.assign(Aa, Bb)  // ObjectA & ObjectB 交叉类型

class ClassAa {
  public isAa: boolean
  constructor(isAa: boolean) {
    this.isAa = isAa
  }
  public funcA() {}
}
class ClassBb {
  public isBb: boolean
  constructor(isBb: boolean) {
    this.isBb = isBb
  }
  public funcB() {}
}

// 将类作为接口来继承
class ClassAB implements ClassAa, ClassBb {
  public isAa: boolean = false
  public isBb: boolean = false

  funcA: any
  funcB: any
}
function mixins(base: any, from: any[]) {
  from.forEach(fromItem => {
    Object.getOwnPropertyNames(fromItem.prototype).forEach(key => {
      console.log(key)
      base.prototype[key] = fromItem.prototype[key]
    })
  });
}

mixins(ClassAB, [ClassBb, ClassAa])

