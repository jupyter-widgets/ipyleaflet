import { WidgetView } from '@jupyter-widgets/base';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletFullScreenControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletFullScreenControlView extends LeafletControlView {
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    create_obj(): void;
}
//# sourceMappingURL=FullScreenControl.d.ts.map