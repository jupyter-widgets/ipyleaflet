import { ImageOverlay } from 'leaflet';
import L from '../leaflet';
import { LeafletRasterLayerModel, LeafletRasterLayerView } from './RasterLayer';
export declare class LeafletImageOverlayModel extends LeafletRasterLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        url: string;
        bounds: number[][];
        attribution: string;
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
export declare class LeafletImageOverlayView extends LeafletRasterLayerView {
    obj: ImageOverlay;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=ImageOverlay.d.ts.map