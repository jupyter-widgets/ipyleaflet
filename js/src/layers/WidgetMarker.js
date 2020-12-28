// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const marker = require('./Marker.js');

export class LeafletWidgetMarkerModel extends marker.LeafletMarkerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletWidgetMarkerView',
      _model_name: 'LeafletWidgetMarkerModel',
      child: null
    };
  }
}

LeafletWidgetMarkerModel.serializers = {
  ...marker.LeafletMarkerModel.serializers,
  child: { deserialize: widgets.unpack_models }
};

export class LeafletWidgetMarkerView extends marker.LeafletMarkerView {
  initialize(parameters) {
    super.initialize(parameters);
    this.child_promise = Promise.resolve();
  }

  create_obj() {
    super.create_obj();

    this.set_icon(this.model.get('child'));
  }

  remove() {
    super.remove();
    this.icon_promise.then(() => {
      if (this.icon) {
        this.icon.remove();
      }
    });
  }

  set_icon(value) {
    if (this.icon) {
      this.icon.remove();
    }
    if (value) {
      this.icon_promise = this.icon_promise.then(() => {
        return this.create_child_view(value).then(view => {
          const container = document.createElement('div');
          container.appendChild(view.el);
          container.classList.add('leaflet-widgetcontrol');
          container.style.top = '50%';
          container.style.left = '50%';
          container.style.transform = 'translate(-50%, -50%)';
          container.style.position = 'absolute';

          this.obj.setIcon(L.divIcon({html: container}));
          this.icon = view;
        });
      });
    }
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:child',
      () => {
        this.set_icon(this.model.get('child'));
      },
      this
    );
  }
}
