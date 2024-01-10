// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// Configure requirejs
if (window.require) {
    window.require.config({
        map: {
            '*': {
                'jupyter-leaflet': 'nbextensions/jupyter-leaflet/index',
            },
        },
    });
}
export function load_ipython_extension() { }
//# sourceMappingURL=extension.js.map