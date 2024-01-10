import { WidgetModel } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletWidgetView } from '../utils';
export class LeafletControlModel extends WidgetModel {
    defaults() {
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
export class LeafletControlView extends LeafletWidgetView {
    initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
    }
    async render() {
        await Promise.resolve(this.create_obj());
        this.leaflet_events();
        this.model_events();
    }
    leaflet_events() { }
    model_events() {
        let key;
        const o = this.model.get('options');
        for (let i = 0; i < o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, () => {
                L.setOptions(this.obj, this.get_options());
            });
        }
    }
}
//# sourceMappingURL=Control.js.map