/*
 * @Author: xuhj
 * @Date: 2019-12-11 17:32:46
 * @LastEditTime: 2019-12-11 17:41:02
 * @Description: 
 */

const mongoose = require( 'mongoose' )
const Movie = mongoose.model( 'Movie' )


export const getAllMovies = async ( type, year ) => {
    let query = {}
    if ( type ) {
        query.movieTypes = {
            $in: [type]
        }
    }

    if ( year ) {
        query.year = year
    }

    const movies = await Movie.find( query )
    
    return movies
}

export const getMovieDetail = async ( id ) => {
    const movie = await Movie.findOne( { _id: id } )
    return movie
}

export const getRelativeMovies = async ( movie ) => {
    const movies = await Movie.findOne( {
        movieTypes: {
            $in: movie.movieTypes
        }
    } )
    return movies
}

