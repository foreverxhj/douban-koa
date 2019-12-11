/*
 * @Author: xuhj
 * @Date: 2019-12-09 16:13:57
 * @LastEditTime: 2019-12-11 10:32:24
 * @Description: 电影爬虫视频
 */
const puppeteer = require( 'puppeteer' )

const base = 'https://movie.douban.com/subject/'
// const doubanId = '1292052'
// const videoBase = 'https://movie.douban.com/trailer/108756/#content'

const sleep = time => new Promise( resolve => {
    setTimeout( resolve, time )
} )

process.on( 'message', async movies => {
    console.log( 'Start visit the targe page Video' )

    const browser = await puppeteer.launch( ( {
        args: [ '--no-sandbox' ],
        dumpio: false
    } ) )

    const page = await browser.newPage()

    for ( let i = 0; i < movies.length; i++ ) {
        let doubanId = movies[ i ].doubanId
        //  console.log(base + doubanId)
        await page.goto( base + doubanId, {
            waitUntil: 'networkidle2',
            timeout: 0
        } )

    
        await sleep( 3000 )
    
        const result = await page.evaluate( () => {
            var $ = window.$
            var it = $( '.related-pic-video' )
    
            if ( it && it.length > 0 ) {
                var link = it.attr( 'href' )
                var cover = it.find( 'img' ).attr( 'src' )
    
                return {
                    link,
                    cover
                }
            }
    
            return {}
        } )
    
        let video
    
        if ( result.link ) {
            await page.goto( result.link, {
                waitUntil: 'networkidle2',
                timeout: 0
            } )
            await sleep( 2000 )
    
            video = await page.evaluate( () => {
                var $ = window.$
                var it = $( 'source' )
                if ( it && it.length > 0 ) {
                    return it.attr( 'src' )
                }
    
                return ''
            } )
        }
    
        const data = {
            video,
            doubanId,
            cover: result.cover
        }
        
        process.send( data )
    }
    
    browser.close()
    process.exit( 0 )
} )