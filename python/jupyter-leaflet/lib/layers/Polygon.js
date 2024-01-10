// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletPolylineModel, LeafletPolylineView } from './Polyline';
export class LeafletPolygonModel extends LeafletPolylineModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPolygonView',
            _model_name: 'LeafletPolygonModel',
        };
    }
}
export class LeafletPolygonView extends LeafletPolylineView {
    create_obj() {
        this.obj = L.polygon(this.model.get('locations'), this.get_options());
    }
}
//# sourceMappingURL=Polygon.js.map