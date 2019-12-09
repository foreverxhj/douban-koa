/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-09 13:58:59
 * @Description: 
 */
const Koa = require( 'koa' )
const app = new Koa()
const { normal } = require('./templete')

app.use( ( async ( ctx, next ) => {
    ctx.type = 'text/html; charset=utf-8 '
    ctx.body = normal
} ) )

app.listen( 3000 )
console.log('server is start up')