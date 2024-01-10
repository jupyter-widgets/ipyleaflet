import L from '../leaflet';
import { LeafletVectorLayerModel, LeafletVectorLayerView } from './VectorLayer';
export declare class LeafletAntPathModel extends LeafletVectorLayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        use: string;
        delay: number;
        weight: number;
        dash_array: number[];
        color: string;
        pulse_color: string;
        paused: boolean;
        reverse: boolean;
        hardware_accelerated: boolean;
        radius: number;
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
export declare class LeafletAntPathView extends LeafletVectorLayerView {
    obj: any;
    create_obj(): void;
    model_events(): void;
    get_ant_options(): Record<string, any>;
}
//# sourceMappingURL=AntPath.d.ts.map