// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import packageJson from '../package.json';

const { version } = packageJson;

const extension = {
  id: 'jupyter-leaflet',
  requires: [IJupyterWidgetRegistry],
  activate: (app: any, widgets: any) => {
    widgets.registerWidget({
      name: 'jupyter-leaflet',
      version: version,
      exports: async () => import('./index'),
    });
  },
  autoStart: true,
};

export default extension;
