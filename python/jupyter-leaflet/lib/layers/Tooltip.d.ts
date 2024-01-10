import { WidgetView } from '@jupyter-widgets/base';
import { Tooltip } from 'leaflet';
import L from '../leaflet';
import { LeafletDivOverlayModel, LeafletDivOverlayView } from './DivOverlay';
export declare class LeafletTooltipModel extends LeafletDivOverlayModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        location: number[];
        child: null;
        offset: number[];
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
export declare class LeafletTooltipView extends LeafletDivOverlayView {
    obj: Tooltip;
    create_obj(): void;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletTooltipModel>): void;
    leaflet_events(): void;
    model_events(): void;
    force_update(): void;
}
//# sourceMappingURL=Tooltip.d.ts.map