// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { WidgetModel, WidgetView, unpack_models } from '@jupyter-widgets/base';
import { DivIcon, Icon, IconOptions, Marker } from 'leaflet';
import L from '../leaflet';
import {
  ILeafletLayerModel,
  LeafletUILayerModel,
  LeafletUILayerView,
} from './Layer';

const DEFAULT_LOCATION = [0.0, 0.0];

interface ILeafletMarkerModel extends ILeafletLayerModel {
  _view_name: string;
  _model_name: string;
  location: number[];
  opacity: number;
  visible: boolean;
  z_index_offset: number;
  draggable: boolean;
  keyboard: boolean;
  title: string;
  alt: string;
  rise_on_hover: boolean;
  rise_offset: number;
  rotation_angle: number;
  rotation_origin: string;
  icon: WidgetModel | null;
}

export class LeafletMarkerModel extends LeafletUILayerModel {
  defaults(): ILeafletMarkerModel {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMarkerView',
      _model_name: 'LeafletMarkerModel',
      location: DEFAULT_LOCATION,
      opacity: 1.0,
      visible: true,
      z_index_offset: 0,
      draggable: true,
      keyboard: true,
      title: '',
      alt: '',
      rise_on_hover: false,
      rise_offset: 250,
      rotation_angle: 0,
      rotation_origin: '',
      icon: null,
    };
  }
}

LeafletMarkerModel.serializers = {
  ...LeafletUILayerModel.serializers,
  icon: { deserialize: unpack_models },
};

interface MarkerWidgetView extends WidgetView {
  obj?: DivIcon | Icon<IconOptions>;
}

export class LeafletMarkerView extends LeafletUILayerView {
  obj: Marker;
  icon_promise: Promise<void>;
  icon?: MarkerWidgetView;

  initialize(parameters: WidgetView.IInitializeParameters<LeafletMarkerModel>) {
    super.initialize(parameters);
    this.icon_promise = Promise.resolve();
  }

  create_obj() {
    this.obj = L.marker(this.model.get('location'), this.get_options());

    this.obj.on('dragend', (event) => {
      var marker = event.target;
      var position = marker.getLatLng();
      this.model.set('location', [position.lat, position.lng]);
      this.touch();
    });
  }

  remove() {
    super.remove();
    this.icon_promise.then(() => {
      if (this.icon) {
        this.icon.remove();
      }
    });
  }

  set_icon(value: WidgetModel) {
    if (this.icon) {
      this.icon.remove();
    }
    if (value) {
      this.icon_promise = this.icon_promise.then(async () => {
        const view: MarkerWidgetView = await this.create_child_view<WidgetView>(
          value
        );
        this.obj.setIcon(view.obj);
        this.icon = view;
      });
    }
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:location', function () {
      this.obj.setLatLng(this.model.get('location'));
      this.send({
        event: 'move',
        location: this.model.get('location'),
      });
    });
    this.listenTo(this.model, 'change:z_index_offset', function () {
      this.obj.setZIndexOffset(this.model.get('z_index_offset'));
    });
    this.listenTo(this.model, 'change:opacity', function () {
      if (this.model.get('visible')) {
        this.obj.setOpacity(this.model.get('opacity'));
      }
    });
    this.listenTo(this.model, 'change:visible', function () {
      if (this.model.get('visible')) {
        this.obj.setOpacity(this.model.get('opacity'));
      } else {
        this.obj.setOpacity(0);
      }
    });
    this.listenTo(this.model, 'change:rotation_angle', function () {
      this.obj.setRotationAngle(this.model.get('rotation_angle'));
    });
    this.listenTo(this.model, 'change:rotation_origin', function () {
      this.obj.setRotationOrigin(this.model.get('rotation_origin'));
    });

    this.obj.setLatLng(this.model.get('location'));
    this.obj.setZIndexOffset(this.model.get('z_index_offset'));
    if (this.model.get('visible')) {
      this.obj.setOpacity(this.model.get('opacity'));
    } else {
      this.obj.setOpacity(0);
    }
    //TODO: Rotation is from a plugin, handling base leaflet first
    //@ts-ignore
    this.obj.setRotationAngle(this.model.get('rotation_angle'));
    //@ts-ignore
    this.obj.setRotationOrigin(this.model.get('rotation_origin'));
    this.listenTo(this.model, 'change:icon', function () {
      this.set_icon(this.model.get('icon'));
    });
    this.set_icon(this.model.get('icon'));
  }
}
