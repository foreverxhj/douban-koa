/*
 * @Author: xuhj
 * @Date: 2019-12-09 17:27:27
 * @LastEditTime: 2019-12-10 19:51:43
 * @Description: 运行爬虫任务
 */
const cp = require( 'child_process' )
const { resolve } = require( 'path' )
    
const mongoose = require( 'mongoose' )
const Movie = mongoose.model('Movie')

    ; ( async () => {
        const script = resolve( __dirname, '../crawler/trailer-list' )
        const child = cp.fork( script, [] )
        let invoked = false

        child.on( 'error', err => {
            if ( invoked ) return

            invoked = true

            console.log( err )
        } )

        child.on( 'exit', code => {
            if ( invoked ) return

            invoked = true
            let err = code === 0 ? null : new Error( 'exit code ' + code )

            console.log( err )
        } )

        child.on( 'message', data => {
            let result = data.result
            result.forEach( async item => {
                let movie = await Movie.findOne( {
                    doubanId: item.doubanId
                } )
                
                if ( !movie ) {
                    movie = new Movie( item )
                    await movie.save()
                }
            })
            // console.log( result )
        } )
    } )()

