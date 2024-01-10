import { WidgetView } from '@jupyter-widgets/base';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletLayersControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletLayersControlView extends LeafletControlView {
    /**
     * Core leaflet layers control maintains its own list of layers internally
     * causing issues when the layers of the underlying map changes
     * exogeneously, for example from a model change.
     *
     * For this reason, upon change of the underlying list of layers, we
     * destroy the layers control object and create a new one.
     */
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    toggle_obj(): void;
    model_events(): void;
    create_obj(): Promise<void>;
}
//# sourceMappingURL=LayersControl.d.ts.map