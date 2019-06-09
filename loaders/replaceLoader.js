const loadUtils = require('loader-utils')

module.exports = function (source) {
    return source.replace('title', 'loader!')
}


