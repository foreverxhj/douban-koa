/*
 * @Author: xuhj
 * @Date: 2019-12-11 16:12:22
 * @LastEditTime: 2019-12-11 17:06:05
 * @Description: 
 */
class Boy{
    @speak
    run () {
        console.log('i can run!')
    }
}

function speak (target, key , descriptor) {
    console.log( target )
    console.log( key )
    console.log( descriptor )
    
}

const Luke = new Boy()

Luke.run()