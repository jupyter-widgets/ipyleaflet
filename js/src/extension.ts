// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// @ts-nocheck

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

export const load_ipython_extension = function () {};
