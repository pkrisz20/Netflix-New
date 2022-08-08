module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/_variables.scss";`
            }
        }
    },
    devServer: {
        proxy: process.env.VUE_APP_API_URL
    }
};

chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
        fix: true
    });
 }