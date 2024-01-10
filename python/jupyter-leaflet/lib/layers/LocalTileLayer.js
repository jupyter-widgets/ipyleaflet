// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { LeafletTileLayerModel, LeafletTileLayerView } from './TileLayer';
export class LeafletLocalTileLayerModel extends LeafletTileLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletLocalTileLayerView',
            _model_name: 'LeafletLocalTileLayerModel',
            path: '',
        };
    }
}
export class LeafletLocalTileLayerView extends LeafletTileLayerView {
    create_obj() {
        this.model.set('url', this.model.get('path'));
        this.model.save_changes();
        super.create_obj();
    }
}
//# sourceMappingURL=LocalTileLayer.js.map