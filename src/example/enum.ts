const value = 5

// 数字枚举可以使用常量或表达式必须返回 number, 后一个枚举值需要指定
enum Status {
  Uploading,
  Success = value,
  Failed = 6
}

// 字符串枚举不可以使用外部常量
enum Message {
  Error = 'Sorry, error',
  Success = 'Hoho, success',
  Failed = Error
}

// 异构枚举 -- 同时包含数字和字符串

enum Animals {
  Dog = 1,
  Cat = 2
}
interface Dog {
  type: Animals
}
const dog: Dog = {
  type: Animals.Dog
}

// 添加 const 声明 -- 不会产生代码生成

