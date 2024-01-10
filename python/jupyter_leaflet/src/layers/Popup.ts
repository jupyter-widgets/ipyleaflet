// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { WidgetView, unpack_models } from '@jupyter-widgets/base';
import { MessageLoop } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import { LatLngTuple, Popup, PopupOptions } from 'leaflet';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';

const DEFAULT_LOCATION = [0.0, 0.0];

type PopupContent = {
  msg: 'open' | 'close';
  location: LatLngTuple;
};

export class LeafletPopupModel extends LeafletUILayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletPopupView',
      _model_name: 'LeafletPopupModel',
      location: DEFAULT_LOCATION,
      child: null,
      min_width: 50,
      max_width: 300,
      max_height: null,
    };
  }
}

LeafletPopupModel.serializers = {
  ...LeafletUILayerModel.serializers,
  child: { deserialize: unpack_models },
};

export class LeafletPopupView extends LeafletUILayerView {
  obj: Popup;
  child: LeafletPopupView; // Change the type as needed
  child_promise: Promise<void>;

  create_obj() {
    this.obj = L.popup(this.get_options() as PopupOptions).setLatLng(
      this.model.get('location')
    );
    this.model.on('msg:custom', this.handle_message.bind(this));
  }

  initialize(parameters: WidgetView.IInitializeParameters<LeafletPopupModel>) {
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

  set_child(value: LeafletPopupModel) {
    if (this.child) {
      this.child.remove();
    }
    if (value) {
      this.child_promise = this.child_promise.then(async () => {
        const view = await this.create_child_view<LeafletPopupView>(value);
        MessageLoop.sendMessage(view.pWidget, Widget.Msg.BeforeAttach);
        this.obj.setContent(view.el);
        MessageLoop.sendMessage(view.pWidget, Widget.Msg.AfterAttach);
        this.force_update();
        this.child = view;
        this.trigger('child:created');
      });
    }
    return this.child_promise;
  }

  leaflet_events() {
    super.leaflet_events();
    this.obj.on('add', () => {
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
  handle_message(content: PopupContent) {
    //const objContent = this.obj.getContent();

    // Check that object has actual Content
    if (
      content.msg == 'open'
      //&& objContent && !(objContent instanceof Function)
    ) {
      // TODO: Using Content object here introduces a bug
      //@ts-ignore
      this.map_view.obj.openPopup(this.obj, content.location);
    } else if (content.msg == 'close') {
      this.map_view.obj.closePopup(this.obj);
    }
  }
}
