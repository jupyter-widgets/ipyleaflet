import { HeatLayer } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerView } from './Layer';
import { LeafletRasterLayerModel } from './RasterLayer';
export declare class LeafletHeatmapModel extends LeafletRasterLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        locations: never[];
        minOpacity: number;
        maxZoom: number;
        max: number;
        radius: number;
        blur: number;
        gradient: {
            0.4: string;
            0.6: string;
            0.7: string;
            0.8: string;
            1: string;
        };
        visible: boolean;
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        name: string;
        base: boolean;
        popup: import("@jupyter-widgets/base").WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: L.Layer[];
    };
}
export declare class LeafletHeatmapView extends LeafletLayerView {
    obj: HeatLayer;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=Heatmap.d.ts.map