import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';
export declare class LeafletAwesomeIconModel extends LeafletUILayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        name: string;
        marker_color: string;
        icon_color: string;
        spin: boolean;
        _view_module: string;
        _model_module: string;
        opacity: number;
        bottom: boolean;
        options: string[];
        base: boolean;
        popup: import("@jupyter-widgets/base").WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: L.Layer[];
    };
}
export declare class LeafletAwesomeIconView extends LeafletUILayerView {
    create_obj(): void;
}
//# sourceMappingURL=AwesomeIcon.d.ts.map