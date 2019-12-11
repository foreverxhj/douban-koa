/*
 * @Author: xuhj
 * @Date: 2019-12-10 17:09:42
 * @LastEditTime: 2019-12-10 19:25:48
 * @Description: category schema
 */
const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema( {
    name: {
        unique: true,
        type: String
    },
    movies: [ {
        type: ObjectId,
        ref: 'Movie'
    }],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
} )

categorySchema.pre( 'save', function(next) {
    // @ts-ignore
    if ( this.isNew ) {
        // @ts-ignore
        this.meta.createdAt = this.meta.createdAt = Date.now()
    } else {
        // @ts-ignore
        this.meta.updatedAt = Date.now()
    }
    next()
})

mongoose.model( 'Category', categorySchema )