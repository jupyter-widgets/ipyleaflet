// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const layer = require('./Layer.js');
const PMessaging = require('@lumino/messaging');
const PWidgets = require('@lumino/widgets');

const DEFAULT_LOCATION = [0.0, 0.0];

export class LeafletPopupModel extends layer.LeafletUILayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletPopupView',
      _model_name: 'LeafletPopupModel',
      location: DEFAULT_LOCATION,
      child: null,
      min_width: 50,
      max_width: 300,
      max_height: null
    };
  }
}

LeafletPopupModel.serializers = {
  ...layer.LeafletUILayerModel.serializers,
  child: { deserialize: widgets.unpack_models }
};

export class LeafletPopupView extends layer.LeafletUILayerView {
  create_obj() {
    this.obj = L.popup(this.get_options()).setLatLng(
      this.model.get('location')
    );
    this.model.on('msg:custom', this.handle_message.bind(this));
  }

  initialize(parameters) {
    super.initialize(parameters);
    this.child_promise = Promise.resolve();
  }

  render() {
    super.render();
    return this.set_child(this.model.get('child'));
  }

  remove() {
    super.remove();
    this.child_promise.then(() => {
      if (this.child) {
        this.child.remove();
      }
    });
  }

  set_child(value) {
    if (this.child) {
      this.child.remove();
    }
    if (value) {
      this.child_promise = this.child_promise.then(() => {
        return this.create_child_view(value).then(view => {
          PMessaging.MessageLoop.sendMessage(
            view.pWidget,
            PWidgets.Widget.Msg.BeforeAttach
          );
          this.obj.setContent(view.el);
          PMessaging.MessageLoop.sendMessage(
            view.pWidget,
            PWidgets.Widget.Msg.AfterAttach
          );
          this.force_update();
          this.child = view;
          this.trigger('child:created');
        });
      });
    }
    return this.child_promise;
  }

  leaflet_events() {
    super.leaflet_events();
    this.obj.on('add', event => {
      // This is a workaround for making maps rendered correctly in popups
      window.dispatchEvent(new Event('resize'));
    });
  }

  model_events() {
    super.model_events();
    this.model.on('change:child', () => {
      this.set_child(this.model.get('child'));
    });
    this.model.on_some_change(
      ['min_width', 'max_width', 'max_height'],
      this.update_popup,
      this
    );
  }

  update_popup() {
    L.setOptions(this.obj, this.get_options());
    this.force_update();
  }

  force_update() {
    // This is a workaround for enforcing the options update
    if (this.map_view.obj.hasLayer(this.obj)) {
      this.map_view.obj.closePopup(this.obj);
      this.map_view.obj.openPopup(this.obj);
    } else {
      this.map_view.obj.openPopup(this.obj);
      this.map_view.obj.closePopup(this.obj);
    }
  }
  handle_message(content) {
    if (content.msg == 'open') {
      this.map_view.obj.openPopup(this.obj, content.location);
    } else if (content.msg == 'close') {
      this.map_view.obj.closePopup(this.obj);
    }
  }
}
