/*
 * @Author: xuhj
 * @Date: 2019-12-09 19:09:55
 * @LastEditTime: 2019-12-09 19:22:34
 * @Description: 异步同步
 */

const doSync = ( sth, time ) => {
    return new Promise( resolve => {
        setTimeout( () => {
            console.log( sth + '用了' + time + '毫秒' )
            resolve()
        },time)
    })
}
const doAsync = ( sth, time, cb ) => {
    setTimeout(() => {
        console.log( sth + '用了' + time + '毫秒' )
        cb && cb()
    }, time);
}
    
const doElse = ( sth ) => {
    console.log(sth)
}
    
const Scott = { doAsync, doSync }
const Meizi = {doAsync, doSync, doElse}
; ( async () => {
    console.log( 'case 1: 妹子来门口' )
    await Scott.doSync( 'Scott 刷牙', 1000 )
    console.log( '啥也没干.一直等' )
    await Meizi.doSync( '妹子洗澡', 1000 )
    Meizi.doElse( '妹子干别的去了' )

    console.log('case 3: 妹子来到门口按下通知开关')
    Scott.doAsync( 'Scott 刷牙', 1000, () => {
        console.log( '卫生间通知妹子来洗澡' )
        Meizi.doAsync('妹子洗澡', 2000)
        
    } )
    Meizi.doElse('妹子干别的去了')
})() 