/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-11 11:09:12
 * @Description: 
 */
const Koa = require( 'koa' )
// const { htmlTpl, ejsTpl, pugTpl } = require( './templete' )
// const ejs = require( 'ejs' )
// const pug = require('pug')
const views = require( 'koa-views' )
const mongoose = require( 'mongoose' )
const { resolve } = require( 'path' )
const { connect, initSchemas, initAdmin } = require( './database/init' )

    ; ( async () => {
        await connect()
        
        initSchemas()

        await initAdmin()

        // require( './task/movie' )
        
        // require('./task/api')

        // require('./task/trailer')
        
    } )();

const app = new Koa()

app.use( views( resolve( __dirname, './views' ), {
    extension: 'pug'
} ) )

app.use( async ( ctx, next ) => {
    await ctx.render( 'index', {
        you: 'Luke!!',
        me: 'Scott'
    } )
} )

app.listen( 3000 )
console.log( 'server is start up' )