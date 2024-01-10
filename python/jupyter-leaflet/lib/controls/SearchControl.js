// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// leaflet-search does not have typescript definitions
import { unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export class LeafletSearchControlModel extends LeafletControlModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletSearchControlView',
            _model_name: 'LeafletSearchControlModel',
            url: null,
            jsonp_param: 'json_callback',
            property_name: 'display_name',
            property_loc: ['lat', 'lon'],
            auto_type: false,
            auto_collapse: false,
            zoom: null,
            animate_location: false,
            found_style: { fillColor: '#3f0', color: '#0f0' },
            marker: null,
            layer: null,
        };
    }
}
LeafletSearchControlModel.serializers = {
    ...LeafletControlModel.serializers,
    marker: { deserialize: unpack_models },
    layer: { deserialize: unpack_models },
};
export class LeafletSearchControlView extends LeafletControlView {
    async create_obj() {
        const layer = this.model.get('layer');
        const marker = this.model.get('marker');
        const layer_promise = layer !== null ? this.create_child_view(layer) : Promise.resolve(null);
        const marker_promise = marker !== null ? this.create_child_view(marker) : Promise.resolve(null);
        const result = await Promise.all([layer_promise, marker_promise]);
        const layer_view = result[0];
        const marker_view = result[1];
        const options = this.get_options();
        options.layer = layer_view !== null ? layer_view.obj : null;
        options.marker = marker_view !== null ? marker_view.obj : false;
        //@ts-ignore
        this.obj = L.control.search(options);
    }
    leaflet_events() {
        this.obj.on('search:locationfound', (e) => {
            if (e.layer !== null) {
                const found_style = this.model.get('found_style');
                e.layer.setStyle(found_style);
                if (e.layer._popup) {
                    e.layer.openPopup();
                }
            }
            this.send({
                event: 'locationfound',
                text: e.text,
                feature: e.layer !== null ? e.layer.feature : null,
                location: [e.latlng.lat, e.latlng.lng],
            });
        });
    }
}
//# sourceMappingURL=SearchControl.js.map