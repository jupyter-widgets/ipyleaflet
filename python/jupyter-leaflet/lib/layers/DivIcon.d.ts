import { DivIcon } from 'leaflet';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';
export declare class LeafletDivIconModel extends LeafletUILayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        html: string;
        bg_pos: number[];
        icon_size: null;
        icon_anchor: null;
        popup_anchor: number[];
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
export declare class LeafletDivIconView extends LeafletUILayerView {
    obj: DivIcon;
    create_obj(): void;
}
//# sourceMappingURL=DivIcon.d.ts.map