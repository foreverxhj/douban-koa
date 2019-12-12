/*
 * @Author: xuhj
 * @Date: 2019-12-11 15:44:22
 * @LastEditTime: 2019-12-11 17:38:19
 * @Description: 路由文件
 */
const Router = require( 'koa-router' )
// const router = new Router()
const mongoose = require( 'mongoose' )

const { get, post, put, controller } = require( '../lib/decorator' )
const { getAllMovies , getMovieDetail ,getRelativeMovies } = require('../service/movie.js')

@controller( '/api/v0/movies' )
export class movieController {

    @get( '/' )
    async getMovies( ctx, next ) {
        const {type ,year} =ctx.query
        const movies = await getAllMovies(type, year)
    
        ctx.body = {
            movies
        }
    }

    @get( '/:id' )
    async getMovieDetail( ctx, next ) {

        const id = ctx.params.id
        const movie = await getMovieDetail( id )
        const relativeMovies = await getRelativeMovies(movie)
        
        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true
        }
    }
}

// router.get( '/movies',  )

// router.get( '/movies/:id',  )

// module.exports = router