/*
* @Author: xuhj
* @Date: 2019-12-10 16:40:36
 * @LastEditTime: 2019-12-11 11:09:25
* @Description: 数据库连接
*/
const mongoose = require( 'mongoose' )
const db = 'mongodb://localhost/douban-koa'
const glob = require( 'glob' )
const { resolve } = require( 'path' )

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/','**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
    const User = mongoose.model( 'User' )
    let user = await User.findOne( {
        username: 'Scott'
    })
    if ( !user ) {
        const user = new User( {
            username: 'Scott',
            email: 'koa@imooc.com',
            password: '123456'
        } )
        await user.save()
    }
}

exports.connect = () => {
    console.log( '进入mongdoDB' )
    let maxConnectTimes = 0
    return new Promise( ( resolve, reject ) => {
        if ( process.env.NODE_ENV !== 'production' ) {
            mongoose.set( 'debug', true )
        }

        mongoose.connect( db, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        } )

        mongoose.connection.on( 'disconnected', () => {
            if ( maxConnectTimes < 5 ) {
                mongoose.connect( db )
            } else {
                throw new Error( '数据库挂了' )
            }
        } )

        mongoose.connection.on( 'error', err => {
            maxConnectTimes++
            if ( maxConnectTimes < 5 ) {
                mongoose.connect( db )
            } else {
                throw new Error( '数据库挂了' )
            }

            console.log( err )
            // mongoose.connect( db )
        } )

        mongoose.connection.once( 'open', () => {
            
            // @ts-ignore
            // const Dog = mongoose.model( 'Dog', { name: String } )
            // const dogs = new Dog( { name: '埃尔法' } )
            
            // dogs.save().then( () => {
            //     console.log('wang')
            // })
            
            resolve()
            console.log( 'MongoDB Connected successfully!' )
        } )
    } )
}