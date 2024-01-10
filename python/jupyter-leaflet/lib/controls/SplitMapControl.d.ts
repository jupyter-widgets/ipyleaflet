import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletSplitMapControlModel extends LeafletControlModel {
    default(): {
        _view_name: string;
        _model_name: string;
        left_layer: undefined;
        right_layer: undefined;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletSplitMapControlView extends LeafletControlView {
    initialize(parameters: any): void;
    create_obj(): any;
}
//# sourceMappingURL=SplitMapControl.d.ts.map