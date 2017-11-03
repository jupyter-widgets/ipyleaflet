var jupyter_leaflet = require('./index');

var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter.extensions.jupyter-leaflet',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-leaflet',
          version: jupyter_leaflet.version,
          exports: jupyter_leaflet
      });
  },
  autoStart: true
};
