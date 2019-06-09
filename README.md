# make-loader

#### 什么是loader？
loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

#### 手写一个替换字符串功能的loader

异步
```
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const callback = this.async();
    
    setTimeout(() => {
        const result = source.replace('title', options.name);
        callback(null, result) // 第一个参数是error
    }, 1000)
}
```


同步

```
const loadUtils = require('loader-utils')

module.exports = function (source) {
    return source.replace('title', 'loader!')
}

```


配置文件

```
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [{
            test: /\.js/,
            use: [
                {
                    loader: 'replaceLoader',
                },
                {
                    loader: 'replaceLoaderAsync',
                    options: {
                        name: 'lee'
                    }
                }
            ]
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```


[更多](https://blog.csdn.net/qq_34629352/article/details/83628917)
