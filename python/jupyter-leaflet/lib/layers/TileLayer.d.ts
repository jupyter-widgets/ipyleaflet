import { TileLayer } from 'leaflet';
import { Spinner } from 'spin.js';
import L from '../leaflet';
import { LeafletRasterLayerModel, LeafletRasterLayerView } from './RasterLayer';
export declare class LeafletTileLayerModel extends LeafletRasterLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        bottom: boolean;
        url: string;
        min_zoom: number;
        max_zoom: number;
        min_native_zoom: null;
        max_native_zoom: null;
        bounds: null;
        tile_size: number;
        attribution: null;
        detect_retina: boolean;
        no_wrap: boolean;
        tms: boolean;
        show_loading: boolean;
        loading: boolean;
        zoom_offset: number;
        visible: boolean;
        _view_module: string;
        _model_module: string;
        opacity: number;
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
export declare class LeafletTileLayerView extends LeafletRasterLayerView {
    obj: TileLayer;
    spinner: Spinner;
    create_obj(): void;
    leaflet_events(): void;
    model_events(): void;
    handle_message(content: {
        msg: string;
    }): void;
}
//# sourceMappingURL=TileLayer.d.ts.map