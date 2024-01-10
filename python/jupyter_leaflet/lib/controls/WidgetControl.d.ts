import { LeafletControlModel, LeafletControlView } from './Control';
export declare class LeafletWidgetControlModel extends LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        widget: null;
        max_width: null;
        min_width: null;
        max_height: null;
        min_height: null;
        transparent_bg: boolean;
        _view_module: string;
        _model_module: string;
        options: string[];
        position: string;
    };
}
export declare class LeafletWidgetControlView extends LeafletControlView {
    widget_view: any;
    obj: any;
    initialize(parameters: any): void;
    set_widget(widget_model: any): Promise<void> | undefined;
    create_obj(): void;
    model_events(): void;
    updateLayout(): void;
}
//# sourceMappingURL=WidgetControl.d.ts.map