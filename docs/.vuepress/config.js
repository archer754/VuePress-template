const Timestamp = new Date().getTime();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    base: "/",                          // 部署站点的基础路径,如果你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束。
    title: '前端知识库',                  // 设置网站标题
    description: '这是个人的知识库',    // 描述
    head: [                             // 额外的需要被注入到当前页面的 HTML <head> 中的标签，每个标签都可以以 [tagName, { attrName: attrValue }, innerHTML?] 的格式指定
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    port: 8080,                         // 端口
    dest: './dist',                     // 设置输出目录
    cache: true,                        // 缓存加快 webpack 的编译速度
    serviceWorker: false,               // 是否开启 PWA
    themeConfig: {                      // 主题配置
        logo: '/assets/img/avatar.png', // logo
        displayAllHeaders: true,        // 默认值：false
        activeHeaderLinks: false,       // 默认值：true
        // 添加导航栏
        nav: [{                         // 导航条
            text: '主页',
            link: '/'
        },
        {
            text: '组件文档',
            link: '/baseComponents/',
            target: '_blank'
        },
        {
            text: '知识库',
            link: '/knowledge/',
            target: '_blank'
        },
        {
            text: 'github', // 这里是下拉列表展现形式。
            items: [{
                text: 'focus-outside',
                link: 'https://github.com/TaoXuSheng/focus-outside',
                target: '_blank'
            },
            {
                text: 'stylus-converter',
                link: 'https://github.com/TaoXuSheng/stylus-converter',
                target: '_blank'
            },
            ]
        }
        ],
        // 为以下路由添加侧边栏
        sidebar: [
            {
                title: '首页',          // 必要的
                path: '/',              // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false,     // 可选的, 默认值是 true,
                children: [
                ]
            },
            {
                title: '指引',
                collapsable: true,
                path: '/views/guide/',
                children: [
                    { title: '指引', path: '/views/guide/' },
                    { title: '知识库', path: '/views/knowledge/' },]
            }
        ],


        lastUpdated: true,        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        nextLinks: true,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        prevLinks: true,

        search: false,          // 禁用默认的搜索框
        searchMaxSuggestions: 10,    // 调整默认搜索框显示的搜索结果数量
        smoothScroll: true,     // 启用页面滚动效果
    },
    optimization: {
        minimize: true,
        splitChunk: { chunks: 'all' },
    },
    // chainWebpack: (config) => {

    //     //压缩图片
    //     config.module.rule('images')
    //         .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //         .use('image-webpack-loader')
    //         .loader('image-webpack-loader')
    //         .options({ bypassOnDebug: true })
    //         .end();
    // },
    plugins: [
        // 提取css
        new MiniCssExtractPlugin({
            filename: `assets/css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`,
            chunkFilename: `assets/css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`
        }),
        // gzip压缩
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: "gzip",
            test: /\.(js|html)$|\.css/,     //匹配文件名
            threshold: 10240,               //对10K以上的数据进行压缩
            deleteOriginalAssets: false     //是否删除源文件
        }),
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        '@vuepress/nprogress'
    ],
    // postcss: { plugins: [require('autoprefixer')] },
    evergreen: true,                     // 不兼容模式
}