// console.log(documentTitle)
// 尽管将 js 文件引入且为全局的情况下, ts 中任然找不到变量, 需要写声明文件

setTitle('lison')
console.log(documentTitle)

// typeof define === 'function'
// typeof module === 'object' && module.exports

import '../modules/add-method-to-string.js'
const name = 'lison'
// 会产生提示
name.getFirstLetter()

// 依赖库
// 库多数会依赖其他库，一些模块会依赖Node原生的模块
// 所以在定义库声明文件时, 声明对其他库的依赖，从而加载其他库的声明

// 如果是依赖全局库, 可以使用 /// <refrennce types="" />