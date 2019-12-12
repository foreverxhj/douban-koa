/*
 * @Author: xuhj
 * @Date: 2019-12-04 17:40:29
 * @LastEditTime: 2019-12-12 14:16:55
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
const R = require( 'ramda' )
const MIDDLEWARES = [ 'router' ]

const useMiddlewares = ( app ) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith( app )
            ),
            require,
            name => resolve( __dirname, `./middlewares/${ name }` )
        )
    )( MIDDLEWARES )
}


    ; ( async () => {
        await connect()

        initSchemas()

        await initAdmin()

        // require( './task/movie' )

        // require('./task/api')

        // require('./task/trailer')

        const app = new Koa()

        await useMiddlewares( app )

        app.listen( 3000 )
        console.log( 'server is start up' )
    } )()