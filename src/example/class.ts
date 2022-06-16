class Person {
  // 构造器内属性使用前需声明
  // 公共属性 可以在类内部使用, 也可以在外部使用, 子类可以访问
  public name: string
  // 私有属性 只可以在类内部使用, 外部无法访问，子类不可以访问
  private age: number
  // 受保护属性 只可以在类内部使用, 外部无法访问, 子类可以访问
  // readonly 只读，不可修改
  protected readonly gender: boolean

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi() {
    // p.gender = false
    // Cannot assign to 'gender' because it is a read-only property
    console.log(`I am ${this.name}, I'm ${this.age} years old`)
  }
}

const p = new Person('Richard', 18)
p.name

// p.age
// Property 'age' is private and only accessible within class 'Person'

// p.gender
// Property 'gender' is protected and only accessible within class 'Person' and its subclasses.ts(2445)

class Teacher extends Person {
  constructor(name: string, age: number) {
    super(name, age)
    // super.age
    // property 'age' is private and only accessible within class 'Person'
  }
}
console.log('---------------------------------------------------------------')

class Human {
  protected _gender: boolean
  // 将修饰符写在构造器参数前 -- 合并声明和赋值操作
  // 参数同样可以运用 ? 修饰
  constructor(public name: string, public age?: number) {
    this._gender = true
  }

  // 通过存储器的方式对一个私有或者受保护属性进行读取和修改
  get gender() {
    return this._gender
  }
  set gender(gender) {
    this._gender = gender
  }
}

const h = new Human('Poly')
h.gender
h.gender = false
console.log('---------------------------------------------------------------')

/**
 * 抽象类的特性！
 *  + 不可以被实例化
 *  + 含有声明但未实现的方法（也可以包含已实现的方法）
 *  + 一个类只能继承一个抽象类
 *  + 一旦有了抽象方法，就一定要把这个类声明为抽象类
 *  + 子类必须覆盖抽象类的抽象方法
 */
abstract class People {
  constructor(public _name: string) {}
  abstract printName(): void
  abstract get name(): string
  // 要注意抽象类中存储器中的存没有返回值
  abstract set name(value)
}

class Man extends People {
  constructor(_name: string) {
    super(_name)
  }
  printName(): void {
      console.log(this.name)
  }
  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
}

const m = new Man('KK')
m.printName()
console.log('---------------------------------------------------------------')

/** 类与接口 */
interface Food {
  type: string
  name: string
}
interface Sweet {
  isSweet(): boolean
} 
class Fruit {
  constructor(public name: string) {}
}
class Apple extends Fruit implements Food, Sweet {
  constructor(public type: string, name: string) {
    super(name)
  }

  isSweet(): boolean {
      return false
  }
}
/**
 * 接口的特性！
 *  + 不可以被实例化
 *  + 含有声明但未实现的方法
 *  + 一个类可以继承多个接口
 *  + 子类必须实现其声明未实现的方法
 *  + 所有成员都是默认Public的，因此接口中不能有Private成员
 *  + 子类必须实现接口的所有成员
 */
console.log('---------------------------------------------------------------')

/** 在泛型中使用类类型 */
// const create = <T>(c: new() => T ): T => {
//   return new c()
// }
// class Base {
//   constructor(public age: number) {}
// }
// create<Base>(Base)