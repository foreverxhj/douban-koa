module.exports = `
doctype html
html
    head
        meta(charset="utf-8")
        meta(name='viewport',contend='width=device-width, inital-scale=1')
        title Koa Serve HTML
        script(href='https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js')
        link(href='https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css' rel="stylesheet")
        script(href='https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js')
    body
        .container
            .row
                .col-md-8
                    h1 Hi #{you}
                    p this is #{me}
                .col-md-4
                    p 测试动态 Pug 模板引擎
`