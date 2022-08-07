module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/_variables.scss";`
            }
        }
    },
    devServer: {
        proxy: 'http://localhost:3000'
    }
};

chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
        fix: true
    });
 }