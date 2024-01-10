import { TileLayer } from 'leaflet';
import L from '../leaflet';
import { LeafletTileLayerModel, LeafletTileLayerView } from './TileLayer';
export declare class LeafletWMSLayerModel extends LeafletTileLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        layers: string;
        styles: string;
        format: string;
        transparent: boolean;
        crs: null;
        uppercase: boolean;
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
export declare class LeafletWMSLayerView extends LeafletTileLayerView {
    obj: TileLayer.WMS;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=WMSLayer.d.ts.map