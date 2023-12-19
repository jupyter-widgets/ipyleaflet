declare const widgets: any;
declare const utils: any;
export declare class LeafletControlModel extends widgets.WidgetModel {
    defaults(): any;
}
export declare class LeafletControlView extends utils.LeafletWidgetView {
    initialize(parameters: any): void;
    render(): Promise<void>;
    leaflet_events(): void;
    model_events(): void;
}
export {};
