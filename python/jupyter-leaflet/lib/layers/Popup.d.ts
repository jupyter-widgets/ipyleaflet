import { WidgetView } from '@jupyter-widgets/base';
import { LatLngTuple, Popup } from 'leaflet';
import L from '../leaflet';
import { LeafletDivOverlayModel, LeafletDivOverlayView } from './DivOverlay';
type PopupContent = {
    msg: 'open' | 'close';
    location: LatLngTuple;
};
export declare class LeafletPopupModel extends LeafletDivOverlayModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        minWidth: number;
        maxWidth: number;
        maxHeight: undefined;
        offset: number[];
        permanent: boolean;
        direction: string;
        location: number[];
        child: null;
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
export declare class LeafletPopupView extends LeafletDivOverlayView {
    obj: Popup;
    create_obj(): void;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletPopupModel>): void;
    leaflet_events(): void;
    model_events(): void;
    force_update(): void;
    handle_message(content: PopupContent): void;
}
export {};
//# sourceMappingURL=Popup.d.ts.map