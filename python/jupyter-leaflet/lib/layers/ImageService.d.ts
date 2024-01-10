import { ImageService } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletImageServiceModel extends LeafletLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        url: string;
        f: string;
        format: string;
        pixelType: string;
        noData: never[];
        noDataInterpretation: string;
        interpolation: string;
        compressionQuality: string;
        bandIds: never[];
        time: never[];
        renderingRule: {};
        mosaicRule: {};
        endpoint: string;
        attribution: string;
        crs: null;
        interactive: boolean;
        updateInterval: number;
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
export declare class LeafletImageServiceView extends LeafletLayerView {
    obj: ImageService;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=ImageService.d.ts.map