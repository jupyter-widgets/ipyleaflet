declare const control: any;
export declare class LeafletLegendControlModel extends control.LeafletControlModel {
    defaults(): any;
}
export declare class LeafletLegendControlView extends control.LeafletControlView {
    initialize(parameters: any): void;
    render(): void;
    create_obj(): void;
    legendChanged(): void;
    positionChanged(): void;
    titleChanged(): void;
    addContent(container: any): void;
}
export {};
