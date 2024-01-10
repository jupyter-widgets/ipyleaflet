import { ViewList } from '@jupyter-widgets/base';
import { LayerGroup } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
export declare class LeafletLayerGroupModel extends LeafletLayerModel {
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
export declare class LeafletLayerGroupView extends LeafletLayerView {
    obj: LayerGroup;
    layer_views: ViewList<LeafletLayerView>;
    create_obj(): void;
    remove_layer_view(child_view: LeafletLayerView): void;
    add_layer_model(child_model: LeafletLayerModel): Promise<LeafletLayerView>;
    model_events(): void;
}
//# sourceMappingURL=LayerGroup.d.ts.map