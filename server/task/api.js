/*
 * @Author: xuhj
 * @Date: 2019-12-09 18:50:04
 * @LastEditTime: 2019-12-09 19:02:09
 * @Description: 
 */
// const api = 'https://douban.uieee.com'

const rp = require( 'request-promise-native' )

async function fetchMovie ( item ) {
    const url = `https://douban-api.uieee.com/v2/movie/subject/${ item.doubanId }`
    const res = await rp( url )
    return res
}
; ( async () => {
    let movies = [ {
        doubanId: 30318116,
        title: '利刃出鞘',
        rate: 8.3,
        poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2574172427.jpg'
    },
    {
        doubanId: 30166972,
        title: '少年的你',
        rate: 8.4,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2572166063.jpg'
    }]
    
    movies.map( async movie => {
        let movieData = await fetchMovie( movie )
        try {
            movieData = JSON.parse(movieData)
            console.log( movieData.summary )
            console.log('==============')
        } catch ( err ) {
            console.log(err)
        }
    })
} )()

