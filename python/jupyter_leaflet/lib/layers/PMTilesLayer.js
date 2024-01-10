// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// protomaps-leaflet does not have typescript definitions
import { json_style, leafletLayer } from 'protomaps-leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletPMTilesLayerModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPMTilesLayerView',
            _model_name: 'LeafletPMTilesLayerModel',
            url: '',
            attribution: '',
            style: {},
        };
    }
}
export class LeafletPMTilesLayerView extends LeafletLayerView {
    create_obj() {
        const options = {
            ...this.get_options(),
            url: this.model.get('url'),
            //@ts-ignore
            ...json_style(this.model.get('style')),
        };
        this.obj = leafletLayer(options);
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:url', () => {
            this.obj.setUrl(this.model.get('url'));
        });
    }
    handle_message(content) {
        if (content.msg == 'add_inspector') {
            this.obj.addInspector(this.map_view.obj);
        }
    }
}
//# sourceMappingURL=PMTilesLayer.js.map