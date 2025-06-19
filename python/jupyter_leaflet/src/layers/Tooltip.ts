// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { WidgetView } from '@jupyter-widgets/base';
import { Tooltip, TooltipOptions } from 'leaflet';
import L from '../leaflet';
import {
  ILeafletLayerModel,
  LeafletUILayerModel,
  LeafletUILayerView,
} from './Layer';

interface ILeafletTooltipModel extends ILeafletLayerModel {
  _view_name: string;
  _model_name: string;
  location: number[] | null;
}

export class LeafletTooltipModel extends LeafletUILayerModel {
  defaults(): ILeafletTooltipModel {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMarkerView',
      _model_name: 'LeafletMarkerModel',
      location: null,
    };
  }
}

export class LeafletTooltipView extends LeafletUILayerView {
  obj: Tooltip;

  initialize(
    parameters: WidgetView.IInitializeParameters<LeafletTooltipModel>
  ) {
    super.initialize(parameters);
  }

  create_obj() {
    if (this.model.get('location')) {
      // Stand-alone tooltip
      this.obj = (L.tooltip as any)(
        this.model.get('location'),
        this.get_options() as TooltipOptions
      );
    } else {
      // TODO: Tooltip to be bound to another layer
      this.obj = L.tooltip(this.get_options() as TooltipOptions);
    }
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:location', () => {
      if (this.model.get('location')) {
        this.obj.setLatLng(this.model.get('location'));
        this.send({
          event: 'move',
          location: this.model.get('location'),
        });
      }
    });
    this.listenTo(this.model, 'change:content', () => {
      this.obj.setContent(this.model.get('content'));
    });
  }
}
