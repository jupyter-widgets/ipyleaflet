import { ViewList, WidgetModel } from '@jupyter-widgets/base';
import { MarkerClusterGroup } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletMarkerClusterModel extends LeafletLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        markers: never[];
        show_coverage_on_hover: boolean;
        zoom_to_bounds_on_click: boolean;
        spiderfy_on_max_zoom: boolean;
        remove_outside_visible_bounds: boolean;
        animate: boolean;
        animate_adding_markers: boolean;
        disableClusteringAtZoom: number;
        maxClusterRadius: number;
        single_marker_mode: boolean;
        spiderfy_distance_multiplier: number;
        polygon_options: {};
        chunked_loading: boolean;
        chunk_interval: number;
        chunk_delay: number;
        spider_leg_polyline_options: {
            weight: number;
            color: string;
            opacity: number;
        };
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        name: string;
        base: boolean;
        popup: WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: L.Layer[];
    };
}
export declare class LeafletMarkerClusterView extends LeafletLayerView {
    obj: MarkerClusterGroup;
    marker_views: ViewList<LeafletLayerView>;
    model_events(): void;
    remove_layer_view(child_view: LeafletLayerView): void;
    add_layer_model(child_model: LeafletLayerModel): Promise<LeafletLayerView>;
    create_obj(): void;
}
//# sourceMappingURL=MarkerCluster.d.ts.map