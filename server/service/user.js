/*
 * @Author: xuhj
 * @Date: 2019-12-12 13:33:17
 * @LastEditTime: 2019-12-12 13:41:47
 * @Description: 管理员登录
 */
const mongoose = require( 'mongoose' )
const User = mongoose.model( 'User' )

export const checkPassword = async ( email, password ) => {
    let match = false
    const user = await User.findOne( { email } )
     
    if ( user ) {
        match = await user.comparePassword(password, user.password)
    }

    return {
        match,
        user
    }
}