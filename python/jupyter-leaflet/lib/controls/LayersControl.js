// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export class LeafletLayersControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletLayersControlView',
            _model_name: 'LeafletLayersControlModel',
        };
    }
}
export class LeafletLayersControlView extends LeafletControlView {
    /**
     * Core leaflet layers control maintains its own list of layers internally
     * causing issues when the layers of the underlying map changes
     * exogeneously, for example from a model change.
     *
     * For this reason, upon change of the underlying list of layers, we
     * destroy the layers control object and create a new one.
     */
    initialize(parameters) {
        super.initialize(parameters);
        this.map_view = this.options.map_view;
    }
    toggle_obj() {
        if (this.obj) {
            this.obj.remove();
            //@ts-ignore
            delete this.obj;
            this.create_obj();
        }
    }
    model_events() {
        this.listenTo(this.map_view.model, 'change:layers', () => {
            this.toggle_obj();
        });
    }
    async create_obj() {
        const views = await Promise.all(this.map_view.layer_views.views);
        let baselayers = views.reduce((ov, view) => {
            if (view.model.get('base')) {
                ov[view.model.get('name')] = view.obj;
            }
            return ov;
        }, {});
        let overlays = views.reduce((ov_1, view_1) => {
            if (!view_1.model.get('base')) {
                ov_1[view_1.model.get('name')] = view_1.obj;
            }
            return ov_1;
        }, {});
        this.obj = L.control.layers(baselayers, overlays, this.get_options());
        this;
        this.obj.addTo(this.map_view.obj);
    }
}
//# sourceMappingURL=LayersControl.js.map