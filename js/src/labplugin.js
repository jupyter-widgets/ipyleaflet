var jupyter_leaflet = require('./index');

var jupyterlab_widgets = require('@jupyterlab/nbwidgets/lib/plugin');

module.exports = {
  id: 'jupyter.extensions.jupyter-leaflet',
  requires: [jupyterlab_widgets.IIPyWidgetExtension],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-leaflet',
          version: jupyter_leaflet.version,
          exports: jupyter_leaflet
      });
  },
  autoStart: true
};
