// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  ViewList,
  WidgetModel,
  WidgetView,
  unpack_models,
} from '@jupyter-widgets/base';
import { IMessageHandler, MessageLoop } from '@lumino/messaging';
import { Widget } from '@lumino/widgets';
import { Control, Layer, LeafletMouseEvent, Popup } from 'leaflet';
import { LeafletControlView, LeafletMapView } from '../jupyter-leaflet';
import L from '../leaflet';
import { LeafletWidgetView } from '../utils';

export interface ILeafletLayerModel {
  _view_name: string;
  _model_name: string;
  _view_module: string;
  _model_module: string;
  opacity: number;
  bottom: boolean;
  options: string[];
  name: string;
  base: boolean;
  popup: WidgetModel | null;
  popup_min_width: number;
  popup_max_width: number;
  popup_max_height: number | null;
  pane: string;
  subitems: Layer[];
}

export class LeafletLayerModel extends WidgetModel {
  defaults(): ILeafletLayerModel {
    return {
      ...super.defaults(),
      _view_name: 'LeafletLayerView',
      _model_name: 'LeafletLayerModel',
      _view_module: 'jupyter-leaflet',
      _model_module: 'jupyter-leaflet',
      opacity: 1.0,
      bottom: false,
      options: [],
      name: '',
      base: false,
      popup: null,
      popup_min_width: 50,
      popup_max_width: 300,
      popup_max_height: null,
      pane: '',
      subitems: [],
    };
  }
}

LeafletLayerModel.serializers = {
  ...WidgetModel.serializers,
  popup: { deserialize: unpack_models },
  subitems: { deserialize: unpack_models },
};

export class LeafletUILayerModel extends LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletUILayerView',
      _model_name: 'LeafletUILayerModel',
    };
  }
}

export class LeafletLayerView extends LeafletWidgetView {
  map_view: LeafletMapView;
  popup_content: LeafletLayerView;
  popup_content_promise: Promise<void>;
  subitem_views: ViewList<LeafletLayerView>;
  obj: Layer;
  subitems: WidgetModel[];
  pWidget: IMessageHandler;

  create_obj(): void {}

  initialize(parameters: WidgetView.IInitializeParameters<LeafletLayerModel>) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
    this.popup_content_promise = Promise.resolve();
  }

  remove_subitem_view(child_view: LeafletLayerView) {
    if (child_view instanceof LeafletLayerView) {
      this.map_view.obj?.removeLayer(child_view.obj);
    }
    if (child_view instanceof LeafletControlView) {
      this.map_view.obj?.removeControl(child_view.obj);
    }
    child_view.remove();
  }

  async add_subitem_model(child_model: LeafletLayerModel) {
    const view: LeafletLayerView =
      await this.create_child_view<LeafletLayerView>(child_model, {
        map_view: this,
      });
    if (view.obj instanceof Layer) {
      this.map_view.obj?.addLayer(view.obj);
    }
    if (view.obj instanceof Control) {
      this.map_view.obj?.addControl(view.obj);
    }
    //Trigger the displayed event of the child view.
    this.displayed.then(() => {
      view.trigger('displayed', this);
    });
    return view;
  }

  async render() {
    await Promise.resolve(this.create_obj());
    this.leaflet_events();
    this.model_events();
    this.bind_popup(this.model.get('popup'));
    this.listenTo(this.model, 'change:popup', (model, value_2) => {
      this.bind_popup(value_2);
    });
    this.update_pane();
    this.subitem_views = new ViewList(
      this.add_subitem_model,
      this.remove_subitem_view,
      this
    );
    this.subitem_views.update(this.model.get('subitems'));
  }

  update_pane() {
    const pane = this.model.get('pane');
    if (pane !== '') {
      L.setOptions(this.obj, { pane });
    }
  }

  leaflet_events() {
    // If the layer is interactive
    if (this.obj.on) {
      this.obj.on(
        // TODO: Calls wrong overload without 'as any'
        'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu preclick' as any,
        (event: LeafletMouseEvent) => {
          this.send({
            event: 'interaction',
            type: event.type,
            coordinates: [event.latlng.lat, event.latlng.lng],
          });
        }
      );
      this.obj.on('popupopen', () => {
        // This is a workaround for making maps rendered correctly in popups
        window.dispatchEvent(new Event('resize'));
      });
      //TODO: transform is from a plugin, working on base leaflet first
      // this layer is transformable
      //@ts-ignore
      if (this.obj.transform) {
        // add the handler only when the layer has been added
        this.obj.on('add', () => {
          //@ts-ignore
          this.update_transform();
        });
        this.obj.on('transformed', () => {
          //@ts-ignore
          this.model.set('locations', this.obj.getLatLngs());
          this.touch();
        });
      }
    }
  }

  model_events() {
    let key: string;
    const o = this.model.get('options');
    for (let i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(this.model, 'change:' + key, () => {
        L.setOptions(this.obj, this.get_options());
      });
    }
    this.model.on_some_change(
      ['popup_min_width', 'popup_max_width', 'popup_max_height'],
      this.update_popup,
      this
    );
    this.listenTo(this.model, 'change:pane', () => {
      this.map_view.rerender();
    });
    this.listenTo(this.model, 'change:subitems', () => {
      this.subitem_views.update(this.subitems);
    });
  }

  remove() {
    super.remove();
    this.subitem_views.remove();
    this.popup_content_promise.then(() => {
      if (this.popup_content) {
        this.popup_content.remove();
      }
    });
  }

  bind_popup(value: WidgetModel) {
    if (this.popup_content) {
      this.obj.unbindPopup();
      this.popup_content.remove();
    }
    if (value) {
      this.popup_content_promise = this.popup_content_promise.then(async () => {
        const view = await this.create_child_view<LeafletLayerView>(value, {
          map_view: this.map_view,
        });
        // If it's a Popup widget
        if (view.obj instanceof Popup) {
          this.obj.bindPopup(view.obj, this.popup_options());
        } else {
          MessageLoop.sendMessage(view.pWidget, Widget.Msg.BeforeAttach);
          this.obj.bindPopup(view.el, this.popup_options());
          MessageLoop.sendMessage(view.pWidget, Widget.Msg.AfterAttach);
        }
        this.popup_content = view;
        this.trigger('popup_content:created');
      });
    }
    return this.popup_content_promise;
  }

  popup_options() {
    return {
      minWidth: this.model.get('popup_min_width'),
      maxWidth: this.model.get('popup_max_width'),
      maxHeight: this.model.get('popup_max_height'),
    };
  }

  update_popup() {
    L.setOptions(this.obj.getPopup(), this.popup_options());

    // Those TWO lines will enforce the options update
    this.obj.togglePopup();
    this.obj.togglePopup();
  }
}

export class LeafletUILayerView extends LeafletLayerView {}
