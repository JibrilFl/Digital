export const server = (done) => {
    app.plugins.browsersync.init({
        proxy: `localhost/${app.path.rootFolder}/dist`
    });
};