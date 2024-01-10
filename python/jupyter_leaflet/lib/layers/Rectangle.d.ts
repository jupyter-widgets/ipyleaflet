import { Rectangle } from 'leaflet';
import L from '../leaflet';
import { LeafletPolygonModel, LeafletPolygonView } from './Polygon';
export declare class LeafletRectangleModel extends LeafletPolygonModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        bounds: never[];
        locations: never[];
        smooth_factor: number;
        no_clip: boolean;
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
export declare class LeafletRectangleView extends LeafletPolygonView {
    obj: Rectangle;
    create_obj(): void;
}
//# sourceMappingURL=Rectangle.d.ts.map