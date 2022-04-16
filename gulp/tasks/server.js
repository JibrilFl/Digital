export const server = (done) => {
    app.plugins.browsersync.init({
        proxy: `localhost:81/${app.path.rootFolder}/dist`
    });
};