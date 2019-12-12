/*
 * @Author: xuhj
 * @Date: 2019-12-11 17:28:20
 * @LastEditTime: 2019-12-12 16:22:07
 * @Description: 
 */
const { Route } = require( '../lib/decorator' )
const { resolve } = require( 'path' )

export const router = app => {
    const apiPath = resolve( __dirname, '../routes' )
    const router = new Route( app, apiPath )

    router.init()
}