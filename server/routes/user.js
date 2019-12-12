/*
 * @Author: xuhj
 * @Date: 2019-12-11 15:44:22
 * @LastEditTime: 2019-12-12 14:20:57
 * @Description: 路由文件
 */
const Router = require( 'koa-router' )
// const router = new Router()
const mongoose = require( 'mongoose' )

const { get, post, put, controller } = require( '../lib/decorator' )
const { checkPassword } = require('../service/user.js')

@controller( '/api/v0/user' )
export class userController {

    @post( '/' )
    async login( ctx, next ) {
        const {email ,password} =ctx.query
        const matchData = await checkPassword(email, password)
        
        if ( !matchData.user ) {
            return ( ctx.body = {
                success: false,
                err: '用户不存在'
            })
        }

        if ( matchData.match ) {
            return ( ctx.body  = {
                success: true
            }  )  
        }

        return (ctx.body = {
            success: false,
            err: '密码不正确'
        })
    }
}