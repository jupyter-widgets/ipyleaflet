// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Setup notebook base URL
__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/jupyter-leaflet/';

module.exports = require('./index.js');
