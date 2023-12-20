// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//var jupyter_leaflet = require('./index');
import * as jupyter_leaflet from './index';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import packageJson from '../package.json';

const { version } = packageJson;

// module.exports = {
//   id: 'jupyter.extensions.jupyter-leaflet',
//   requires: [base.IJupyterWidgetRegistry],
//   activate: function (app: any, widgets: any) {
//     widgets.registerWidget({
//       name: 'jupyter-leaflet',
//       version: jupyter_leaflet.version,
//       exports: jupyter_leaflet,
//     });
//   },
//   autoStart: true,
// };

const extension = {
  id: 'jupyter.extensions.jupyter-leaflet',
  requires: [IJupyterWidgetRegistry],
  activate: (app: any, widgets: any) => {
    widgets.registerWidget({
      name: 'jupyter-leaflet',
      version: version,
      exports: jupyter_leaflet,
    });
  },
  autoStart: true,
};

export default extension;
