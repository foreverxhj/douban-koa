/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-04 17:41:44
 * @Description: 
 */
const Koa = require( 'koa' )
const app = new Koa()
app.use( ( async ( ctx, next ) => {
    ctx.body = '电影首页'
} ) )

app.listen( 3000 )
console.log('server is start up')