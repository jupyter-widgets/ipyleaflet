import { FeatureGroup } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerGroupModel, LeafletLayerGroupView } from './LayerGroup';
export declare class LeafletFeatureGroupModel extends LeafletLayerGroupModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
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
export declare class LeafletFeatureGroupView extends LeafletLayerGroupView {
    obj: FeatureGroup;
    create_obj(): void;
}
//# sourceMappingURL=FeatureGroup.d.ts.map