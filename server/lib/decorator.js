
/*
 * @Author: xuhj
 * @Date: 2019-12-11 17:09:36
 * @LastEditTime: 2019-12-12 16:21:55
 * @Description: 装饰器
 */

const Router = require( 'koa-router' )
const { resolve } = require( 'path' )
const _ = require( 'lodash' )
const glob = require( 'glob' )

const symbolPrefix = Symbol( 'prefix' )
const routerMap = new Map()

const isArray = c => _.isArray( c ) ? c : [ c ]

export class Route {
    constructor ( app, apiPath ) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init () {
        glob.sync( resolve( this.apiPath, './**/*.js' ) ).forEach( require )

        for ( let [ conf, controller ] of routerMap ) {
            const controllers = isArray( controller )
            const prefixPath = conf.target[ symbolPrefix ]
            if ( prefixPath ) prefixPath = normalizePath( prefixPath )
            const routerPath = prefixPath + conf.path
            this.router[ conf.method ]( routerPath, ...controllers )
        }

        this.app.use( this.router.routes() )
        this.app.use( this.router.allowedMethods() )
    }
}

const normalizePath = path => path.startsWith( '/' ) ? path : `/${ path }`

const router = conf => ( target, key, descriptor ) => {
    conf.path = normalizePath( conf.path )

    routerMap.set( {
        target: target,
        ...conf
    }, target[ key ] )
}

export const controller = path => target => ( target.prototype[ symbolPrefix ] = path )

export const get = path => router( {
    method: 'get',
    path: path
} )

export const post = path => router( {
    method: 'post',
    path: path
} )

export const put = path => router( {
    method: 'put',
    path: path
} )

export const del = path => router( {
    method: 'del',
    path: path
} )

export const use = path => router( {
    method: 'use',
    path: path
} )

export const all = path => router( {
    method: 'all',
    path: path
} )