import { LeafletTileLayerModel, LeafletTileLayerView } from './TileLayer';
export declare class LeafletLocalTileLayerModel extends LeafletTileLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        path: string;
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
        subitems: import("leaflet").Layer[];
    };
}
export declare class LeafletLocalTileLayerView extends LeafletTileLayerView {
    create_obj(): void;
}
//# sourceMappingURL=LocalTileLayer.d.ts.map