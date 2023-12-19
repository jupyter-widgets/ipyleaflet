declare const control: any;
export declare class LeafletWidgetControlModel extends control.LeafletControlModel {
    defaults(): {
        _view_name: string;
        _model_name: string;
        widget: any;
        max_width: any;
        min_width: any;
        max_height: any;
        min_height: any;
        transparent_bg: boolean;
    };
}
export declare class LeafletWidgetControlView extends control.LeafletControlView {
    initialize(parameters: any): void;
    set_widget(widget_model: any): any;
    create_obj(): void;
    model_events(): void;
    updateLayout(): void;
}
export {};
