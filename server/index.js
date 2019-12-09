/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-09 14:47:03
 * @Description: 
 */
const Koa = require( 'koa' )
const app = new Koa()
// const { htmlTpl, ejsTpl, pugTpl } = require( './templete' )
// const ejs = require( 'ejs' )
// const pug = require('pug')
const views = require( 'koa-views' )
const { resolve } = require( 'path' )

app.use( views( resolve( __dirname, './views' ), {
    extension: 'pug'
}))

app.use( async ( ctx, next ) => {
    await ctx.render( 'index', {
        you: 'Luke!!',
        me: 'Scott'
    })
})

app.listen( 3000 )
console.log('server is start up')