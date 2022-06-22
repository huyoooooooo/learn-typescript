// 由于装饰器还是处于提案阶段，若需要在 ts 中使用，需要将配置文件 "experimentalDecorators": true  开启

function setName() {
  console.log('get setName')
  return (target: any) => {
    console.log('setName')
  }
}

function setAge() {
  console.log('get setAge')
  return (target:any) => {
    console.log('setAge')
  }
}

@setName()
@setAge()
class ClassDesc {}
console.log('---------------------------------------------------------------')

/** 输出顺序
 * get setName
 * get setAge
 * setAge
 * setName
 * 
 * 可以看到首先从上到下执行装饰器工厂, 求职得到了装饰器, 再从下向上执行装饰器
 */

/** 类的定义中不同声明上的装饰器是有规定的顺序进行引用，装饰器要紧挨着要修饰的内容
 * 
 * 参数装饰器、方法装饰器、访问服务装饰器、属性装饰器应用到每个实例成员上
 * 参数装饰器、方法装饰器、访问服务装饰器、属性装饰器应用到每个静态成员上
 * 参数装饰器 应用到构造函数上
 * 类装饰器应用到类上
 */
console.log('---------------------------------------------------------------')

/**
 * 类装饰器在类声明之前声明, 其表达式会在运行的时候被当作函数调用，有一个唯一参数即该类
 */
let sign = null
function setName1(name: string) {
  return (target: new() => any) => {
    sign = target
    console.log(target.name)
  }
}

@setName1('lison')
class ClassDesc1 {}
console.log(sign === ClassDesc1)                            // true
console.log(sign === ClassDesc1.prototype.constructor)      // true

function addName(constructor: new() => any) {
  constructor.prototype.name = 'lison'
}

@addName
class D {}
interface D {
  name: string
}
// 这里类和接口声明合并之后, 将属性挂在到了类的原型对象上了
const d = new D()
console.dir(d.name)


function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
  return class extends target {
    public newProperty = 'new Property'
    public hello = 'override'
  }
}

@classDecorator
class Greater {
  public property = 'property'
  public hello:string

  constructor(m: string) {
    this.hello = m
  }
}

console.dir(new Greater('world'))
console.log('---------------------------------------------------------------')

/**  
 * 方法装饰器用来处理类中的方法, 可以处理方法的属性描述符，处理方法的定义, 
 * 运行时被当作函数调用, 包含三个参数
 *  第一个参数 
 *      - 静态成员: 参数是类的构造函数
 *      - 实例成员：参数是类的原型对象
 *  第二个参数: 成员名称
 *  第三个参数：成员的属性描述符
*/

// configurable 可配置
// writable    可写
// enumerable   可枚举

interface ObjectWithAnyKeys {
  [key: string]: any
}
let object: ObjectWithAnyKeys = {}
Object.defineProperty(object, 'name', {
  value: 'lison',
  writable: false,
  configurable: true,
  enumerable: true
})
console.log(object)

function enumerable(bool: boolean) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log(target)
    descriptor.enumerable = bool
  }
}
class F {
  constructor(public age: number) {}
  
  @enumerable(false)
  public getAge() {
    return this.age
  }
}
const f = new F(18)
for (const k in f) { console.log(k) }
console.log('---------------------------------------------------------------')

/**
 * 访问器装饰器 分别在设置和获取时触发, ts 不允许同时装饰一个成员的 get 和 set 的访问器
 * 参数和方法装饰器一致
 */
class G {
  public _name: string
  constructor(name: string) {
    this._name = name
  }

  @enumerable(false)
  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
}
const g = new G('lison')
console.log(g)
for (const k in g) { console.log(k) }
console.log('---------------------------------------------------------------')

/**
 * 属性装饰器声明在属性的声明之前，有两个参数，和方法装饰器前两个一致
 * 不能操作属性描述符，只能用来判断某个类中是否声明了某个属性的名字
 */
function printPropertyName(target: any, propertyName: string) {
  console.log('属性装饰器:' + propertyName)
}
class H {
  @printPropertyName
  public name: string

  constructor(name: string) {
    this.name = name
  }
}
console.log('---------------------------------------------------------------')

/**
 * 参数装饰器有三个参数
 *  - 前两个和方法装饰器一致
 *  - 第三个参数
 *    参数在函数参数列表中的索引
 */
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰符的是${propertyName}的第${index+1}个参数`)
}
class I {
  // this[infoType] 上卖弄不加这句话会报错
  public name: string = 'lison'
  public age: number = 18
  
  public getInfo (prefix: string, @required infoType: string): any {
    return prefix + ' ' + this[infoType]
  }
}
interface I {
  [k: string]: string|number|Function
}
const i = new I()
console.log(i.getInfo('hihi', 'age'))