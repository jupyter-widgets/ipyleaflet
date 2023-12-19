declare const control: any;
export declare class LeafletDrawControlModel extends control.LeafletControlModel {
    defaults(): any;
}
export declare class LeafletDrawControlView extends control.LeafletControlView {
    initialize(parameters: any): void;
    create_obj(): void;
    remove(): void;
    data_to_layers(): void;
    layers_to_data(): void;
    handle_message(content: any): void;
}
export {};
