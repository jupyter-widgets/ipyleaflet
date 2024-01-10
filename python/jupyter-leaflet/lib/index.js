// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// @ts-nocheck
import packageJson from '../package.json';
// Export everything from jupyter-leaflet and the npm package version number.
var _oldL = window.L;
// if previous L existed and it got changed while loading this module
if (_oldL !== undefined && _oldL !== window.L) {
    console.log("Existing `L` detected, running ipyleaflet's Leaflet in no-conflict mode as `ipyL`");
    ipyL = L.noConflict(); // eslint-disable-line no-undef
}
const { version } = packageJson;
export * from './jupyter-leaflet';
export { version };
//# sourceMappingURL=index.js.map