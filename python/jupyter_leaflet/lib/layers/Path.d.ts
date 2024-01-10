import { Path } from 'leaflet';
import { LeafletVectorLayerModel, LeafletVectorLayerView } from './VectorLayer';
export declare class LeafletPathModel extends LeafletVectorLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        stroke: boolean;
        color: string;
        weight: number;
        fill: boolean;
        fill_color: null;
        fill_opacity: number;
        dash_array: null;
        line_cap: string;
        line_join: string;
        pointer_events: string;
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
export declare class LeafletPathView extends LeafletVectorLayerView {
    obj: Path;
    model_events(): void;
}
//# sourceMappingURL=Path.d.ts.map