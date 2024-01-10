import { WidgetView } from '@jupyter-widgets/base';
import { Control } from 'leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletScaleControlModel extends LeafletControlModel {
    obj: Control.Scale;
    defaults(): {
        _view_name: string;
        _model_name: string;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletScaleControlView extends LeafletControlView {
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    create_obj(): void;
}
//# sourceMappingURL=ScaleControl.d.ts.map