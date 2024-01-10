// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';
export class LeafletAwesomeIconModel extends LeafletUILayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletAwesomeIconView',
            _model_name: 'LeafletAwesomeIconModel',
            name: 'home',
            marker_color: 'blue',
            icon_color: 'blue',
            spin: false,
        };
    }
}
export class LeafletAwesomeIconView extends LeafletUILayerView {
    create_obj() {
        this.obj = L.AwesomeMarkers.icon({
            prefix: 'fa',
            icon: this.model.get('name'),
            markerColor: this.model.get('marker_color'),
            iconColor: this.model.get('icon_color'),
            spin: this.model.get('spin'),
        });
    }
}
//# sourceMappingURL=AwesomeIcon.js.map