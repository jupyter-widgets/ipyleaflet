import { GeoJSON } from 'leaflet';
import L from '../leaflet';
import { LeafletFeatureGroupModel, LeafletFeatureGroupView } from './FeatureGroup';
export declare class LeafletGeoJSONModel extends LeafletFeatureGroupModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        data: {};
        style: {};
        visible: boolean;
        hover_style: {};
        point_style: {};
        layers: never[];
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
export declare class LeafletGeoJSONView extends LeafletFeatureGroupView {
    obj: GeoJSON;
    create_obj(): void;
    model_events(): void;
}
//# sourceMappingURL=GeoJSON.d.ts.map