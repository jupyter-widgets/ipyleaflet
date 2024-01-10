import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletVectorLayerModel extends LeafletLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
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
export declare class LeafletVectorLayerView extends LeafletLayerView {
}
//# sourceMappingURL=VectorLayer.d.ts.map