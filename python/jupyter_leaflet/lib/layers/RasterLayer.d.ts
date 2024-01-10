import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletRasterLayerModel extends LeafletLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
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
        subitems: import("leaflet").Layer[];
    };
}
export declare class LeafletRasterLayerView extends LeafletLayerView {
    obj: any;
    model_events(): void;
}
//# sourceMappingURL=RasterLayer.d.ts.map