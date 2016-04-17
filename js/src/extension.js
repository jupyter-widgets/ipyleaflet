// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "jupyter-leaflet": "nbextensions/jupyter-leaflet/index",
                "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension"
            }
        }
    });
}

// Export the required load_ipython_extention
module.exports = {
    load_ipython_extension: function() {}
};
