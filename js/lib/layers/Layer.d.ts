declare const widgets: any;
declare const utils: any;
export declare class LeafletLayerModel extends widgets.WidgetModel {
    defaults(): any;
}
export declare class LeafletUILayerModel extends LeafletLayerModel {
    defaults(): any;
}
export declare class LeafletLayerView extends utils.LeafletWidgetView {
    initialize(parameters: any): void;
    remove_subitem_view(child_view: any): void;
    add_subitem_model(child_model: any): any;
    render(): Promise<void>;
    update_pane(): void;
    leaflet_events(): void;
    model_events(): void;
    remove(): void;
    bind_popup(value: any): any;
    popup_options(): {
        minWidth: any;
        maxWidth: any;
        maxHeight: any;
    };
    update_popup(): void;
}
export declare class LeafletUILayerView extends LeafletLayerView {
}
export {};
