import { WidgetModel, WidgetView } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletWidgetView } from '../utils';

export interface LeafletControlModelOptions {
  _view_name: string;
  _model_name: string;
  _view_module: string;
  _model_module: string;
  options: string[];
  position: string;
}
export class LeafletControlModel extends WidgetModel {
  defaults(): LeafletControlModelOptions {
    return {
      ...super.defaults(),
      _view_name: 'LeafletControlView',
      _model_name: 'LeafletControlModel',
      _view_module: 'jupyter-leaflet',
      _model_module: 'jupyter-leaflet',
      options: [],
      position: 'topleft',
    };
  }
}

export abstract class LeafletControlView extends LeafletWidgetView {
  map_view: any;
  obj: L.Control;

  initialize(
    parameters: WidgetView.IInitializeParameters<LeafletControlModel>
  ): void {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  async render() {
    await Promise.resolve(this.create_obj());
    this.leaflet_events();
    this.model_events();
  }

  leaflet_events() {}

  model_events() {
    let key: string;
    const o = this.model.get('options');
    for (let i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(this.model, 'change:' + key, () => {
        L.setOptions(this.obj, this.get_options());
      });
    }
  }

  abstract create_obj(): void;
}
