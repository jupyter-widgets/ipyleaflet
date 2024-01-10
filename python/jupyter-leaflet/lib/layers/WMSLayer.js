// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { getProjection } from '../projections';
import { LeafletTileLayerModel, LeafletTileLayerView } from './TileLayer';
export class LeafletWMSLayerModel extends LeafletTileLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletWMSLayerView',
            _model_name: 'LeafletWMSLayerModel',
            layers: '',
            styles: '',
            format: 'image/jpeg',
            transparent: false,
            crs: null,
            uppercase: false,
        };
    }
}
export class LeafletWMSLayerView extends LeafletTileLayerView {
    create_obj() {
        this.obj = L.tileLayer.wms(this.model.get('url'), {
            ...this.get_options(),
            crs: getProjection(this.model.get('crs')),
        });
    }
    model_events() {
        super.model_events();
        for (let option in this.get_options()) {
            this.model.on('change:' + option, () => {
                this.obj.setParams(this.get_options(), true);
                this.obj.refresh();
            });
        }
    }
}
//# sourceMappingURL=WMSLayer.js.map