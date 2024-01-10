import { Circle } from 'leaflet';
import L from '../leaflet';
import { LeafletCircleMarkerModel, LeafletCircleMarkerView } from './CircleMarker';
export declare class LeafletCircleModel extends LeafletCircleMarkerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        location: number[];
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
        subitems: L.Layer[];
    };
}
export declare class LeafletCircleView extends LeafletCircleMarkerView {
    obj: Circle;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=Circle.d.ts.map