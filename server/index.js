/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-09 14:21:19
 * @Description: 
 */
const Koa = require( 'koa' )
const app = new Koa()
const { htmlTpl, ejsTpl, pugTpl } = require( './templete' )
const ejs = require( 'ejs' )
const pug = require('pug')

app.use( ( async ( ctx, next ) => {
    ctx.type = 'text/html; charset=utf-8 '
    ctx.body = pug.render( pugTpl, {
        you: 'Luke!',
        me: 'Scott'
    })
} ) )

app.listen( 3000 )
console.log('server is start up')