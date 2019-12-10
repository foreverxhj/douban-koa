/*
 * @Author: xuhj
 * @Date: 2019-12-10 13:44:51
 * @LastEditTime: 2019-12-10 14:19:41
 * @Description: 
 */
const { readFile } = require( 'fs' )
const EventEmitter = require( 'events' )

class EE extends EventEmitter { }

const yy = new EE()

yy.on( 'event', () => {
    console.log('出大事了')
} )

setTimeout( () => {
    console.log('0 毫秒后执行')
}, 0 )

setTimeout( () => {
    console.log('100 毫秒后执行')
}, 100 )

setTimeout( () => {
    console.log('200 毫秒后执行')
}, 200 )

readFile( '../../package.json', 'utf-8', data => {
    console.log('完成文件1的读取操作')
} )

readFile( '../../README.md', 'utf-8', data => {
    console.log('完成文件2的读取操作')
} )

setImmediate( () => {
    console.log('immediate 立即回调')
} )

process.nextTick( () => {
    console.log('process.nextTick 回调')
} )

Promise.resolve().then( () => {
    yy.emit( 'event' )
    
    process.nextTick( () => {
        console.log('process.nextTick 的第2次回调')
    } )
    
    console.log('Promise 的第一次回调')
} ).then( () => {
    console.log('Promise 的第二次回调')
})