// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { ViewList, WidgetModel, unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export class LeafletMarkerClusterModel extends LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletMarkerClusterView',
            _model_name: 'LeafletMarkerClusterModel',
            markers: [],
            show_coverage_on_hover: true,
            zoom_to_bounds_on_click: true,
            spiderfy_on_max_zoom: true,
            remove_outside_visible_bounds: true,
            animate: true,
            animate_adding_markers: false,
            disableClusteringAtZoom: 18,
            maxClusterRadius: 80,
            single_marker_mode: false,
            spiderfy_distance_multiplier: 1,
            polygon_options: {},
            chunked_loading: false,
            chunk_interval: 200,
            chunk_delay: 50,
            spider_leg_polyline_options: {
                weight: 1.5,
                color: '#333',
                opacity: 0.5,
            },
        };
    }
}
LeafletMarkerClusterModel.serializers = {
    ...WidgetModel.serializers,
    markers: { deserialize: unpack_models },
};
export class LeafletMarkerClusterView extends LeafletLayerView {
    model_events() {
        super.model_events();
        this.listenTo(this.model, 'change:markers', (model) => {
            this.marker_views.update(model.get('markers'));
        });
    }
    remove_layer_view(child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    }
    async add_layer_model(child_model) {
        const child_view = await this.create_child_view(child_model, {
            map_view: this.map_view,
        });
        this.obj.addLayer(child_view.obj);
        return child_view;
    }
    create_obj() {
        const options = this.get_options();
        this.obj = L.markerClusterGroup(options);
        this.marker_views = new ViewList(this.add_layer_model, this.remove_layer_view, this);
        this.marker_views.update(this.model.get('markers'));
    }
}
//# sourceMappingURL=MarkerCluster.js.map