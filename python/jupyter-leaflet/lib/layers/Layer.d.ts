import { ViewList, WidgetModel, WidgetView } from '@jupyter-widgets/base';
import { IMessageHandler } from '@lumino/messaging';
import { Layer } from 'leaflet';
import { LeafletMapView } from '../jupyter-leaflet';
import { LeafletWidgetView } from '../utils';
export interface ILeafletLayerModel {
    _view_name: string;
    _model_name: string;
    _view_module: string;
    _model_module: string;
    opacity: number;
    bottom: boolean;
    options: string[];
    name: string;
    base: boolean;
    popup: WidgetModel | null;
    popup_min_width: number;
    popup_max_width: number;
    popup_max_height: number | null;
    pane: string;
    subitems: Layer[];
}
export declare class LeafletLayerModel extends WidgetModel {
    defaults(): ILeafletLayerModel;
}
export declare class LeafletUILayerModel extends LeafletLayerModel {
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
        popup: WidgetModel | null;
        popup_min_width: number;
        popup_max_width: number;
        popup_max_height: number | null;
        pane: string;
        subitems: Layer[];
    };
}
export declare class LeafletLayerView extends LeafletWidgetView {
    map_view: LeafletMapView;
    popup_content: LeafletLayerView;
    popup_content_promise: Promise<void>;
    subitem_views: ViewList<LeafletLayerView>;
    obj: Layer;
    subitems: WidgetModel[];
    pWidget: IMessageHandler;
    create_obj(): void;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletLayerModel>): void;
    remove_subitem_view(child_view: LeafletLayerView): void;
    add_subitem_model(child_model: LeafletLayerModel): Promise<LeafletLayerView>;
    render(): Promise<void>;
    update_pane(): void;
    leaflet_events(): void;
    model_events(): void;
    remove(): void;
    bind_popup(value: WidgetModel): Promise<void>;
    popup_options(): {
        minWidth: any;
        maxWidth: any;
        maxHeight: any;
    };
    update_popup(): void;
}
export declare class LeafletUILayerView extends LeafletLayerView {
}
//# sourceMappingURL=Layer.d.ts.map