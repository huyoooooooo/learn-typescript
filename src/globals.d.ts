// 官方给声明文件提供了一些模板，注意看官方文档

declare function setTitle(title: string|number): void {} 

declare function getTitle():string {}

declare let documentTitle: string

// declare 声明就是全局声明
// 通过 export 则为模块

interface String {
  getFirstLetter(): string
}

// ///<refrence types="moment" />
// import * as moment from 'moment'
