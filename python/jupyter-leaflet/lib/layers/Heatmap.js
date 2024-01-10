// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import L from '../leaflet';
import { LeafletLayerView } from './Layer';
import { LeafletRasterLayerModel } from './RasterLayer';
export class LeafletHeatmapModel extends LeafletRasterLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletHeatmapView',
            _model_name: 'LeafletHeatmapModel',
            locations: [],
            minOpacity: 0.05,
            maxZoom: 18,
            max: 1.0,
            radius: 25.0,
            blur: 15.0,
            gradient: {
                0.4: 'blue',
                0.6: 'cyan',
                0.7: 'lime',
                0.8: 'yellow',
                1.0: 'red',
            },
        };
    }
}
export class LeafletHeatmapView extends LeafletLayerView {
    create_obj() {
        this.obj = L.heatLayer(this.model.get('locations'), this.get_options());
    }
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:locations', () => {
            this.obj.setLatLngs(this.model.get('locations'));
        });
    }
}
//# sourceMappingURL=Heatmap.js.map