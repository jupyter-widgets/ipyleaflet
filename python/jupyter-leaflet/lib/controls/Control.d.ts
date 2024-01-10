import { WidgetModel, WidgetView } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletWidgetView } from '../utils';
export interface LeafletControlModelOptions {
    _view_name: string;
    _model_name: string;
    _view_module: string;
    _model_module: string;
    options: string[];
    position: string;
}
export declare class LeafletControlModel extends WidgetModel {
    defaults(): LeafletControlModelOptions;
}
export declare abstract class LeafletControlView extends LeafletWidgetView {
    map_view: any;
    obj: L.Control;
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    render(): Promise<void>;
    leaflet_events(): void;
    model_events(): void;
    abstract create_obj(): void;
}
//# sourceMappingURL=Control.d.ts.map