/*
 * @Author: xuhj
 * @Date: 2019-12-09 10:47:16
 * @LastEditTime: 2019-12-09 14:16:54
 * @Description: ejs模板页面
 */
module.exports = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewpoint" content="witdh=device-width, initial-scale=1">
            <title>Koa Serve HTML</title>
            <script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js"></script>
            <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <h1>Hi <%= you %></h1>
                        <p>this is <%= me %></p>
                    </div>
                    <div class="col-md-4">
                        <p>动态EJS模板引擎</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
`