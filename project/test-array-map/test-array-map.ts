const arrayMap = <T, U>(array: T[], callback: (item: T, index: number, array: ReadonlyArray<T>) => U): U[] => {
  let i = -1
  const len = array.length

  const resArray: any[] = []

  while(++i < len) {
    resArray.push(callback(array[i], i, array))
  }

  return resArray
}

export = arrayMap

// 通过 npm login 登录 npm 账号
// 输入用户名和密码

// .npmignore 和 .gitignore 使用是一致的, 只不过默认忽略 node_modules
// 每一次发包都要注意修改一下 version 版本号

// npm publish 指令进行发布
