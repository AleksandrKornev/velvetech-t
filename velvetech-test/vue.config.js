const path = require('path');

/* module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        styles: path.resolve(__dirname, '../src/assets/scss/index.scss') // relative to the location of the webpack config file!
      }
    }
  }
} */

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/index.scss";`
      }
    }
  }
}