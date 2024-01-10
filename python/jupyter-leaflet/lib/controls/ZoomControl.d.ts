import { WidgetView } from '@jupyter-widgets/base';
import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletZoomControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        zoom_in_text: string;
        zoom_in_title: string;
        zoom_out_text: string;
        zoom_out_title: string;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletZoomControlView extends LeafletControlView {
    initialize(parameters: WidgetView.IInitializeParameters<LeafletControlModel>): void;
    create_obj(): void;
}
//# sourceMappingURL=ZoomControl.d.ts.map