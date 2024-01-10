import { WidgetView } from '@jupyter-widgets/base';
import { LatLngTuple, Popup } from 'leaflet';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';
type PopupContent = {
    msg: 'open' | 'close';
    location: LatLngTuple;
};
export declare class LeafletPopupModel extends LeafletUILayerModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        location: number[];
        child: null;
        min_width: number;
        max_width: number;
        max_height: null;
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
export declare class LeafletPopupView extends LeafletUILayerView {
    obj: Popup;
    child: LeafletPopupView;
    child_promise: Promise<void>;
    create_obj(): void;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletPopupModel>): void;
    render(): Promise<void>;
    remove(): void;
    set_child(value: LeafletPopupModel): Promise<void>;
    leaflet_events(): void;
    model_events(): void;
    update_popup(): void;
    force_update(): void;
    handle_message(content: PopupContent): void;
}
export {};
//# sourceMappingURL=Popup.d.ts.map